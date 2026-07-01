"use client";

import {
  getDefaultCollapsedHeight,
  getViewportPanelHeightPx,
} from "@/lib/panelShell/panelShellLayout";
import type { PanelShellHeightMode, PanelShellLayout } from "@/lib/panelShell/types";
import { uiTransition } from "@/lib/transitions";
import { useCallback, useEffect, useRef, useState } from "react";

/** Wait for in-panel page swap before remeasuring content height (fast exit + medium enter). */
const ROOT_RETURN_SETTLE_MS =
  uiTransition.durationMs.fast + uiTransition.durationMs.medium;

type UseAnimatedPanelShellOptions<TRoute extends string> = {
  defaultOpen?: boolean;
  layout?: PanelShellLayout;
  heightMode?: PanelShellHeightMode;
  rootRoute: TRoute;
  currentRoute: TRoute;
  collapsedHeight?: number;
};

/**
 * Behavior: animates panel shell width/height when layout context changes —
 * open/close, content vs viewport mode, window resize, content remeasure.
 * Independent of in-panel slide navigation style.
 */
export function useAnimatedPanelShell<TRoute extends string>({
  defaultOpen = false,
  layout = "desktop",
  heightMode = "content",
  rootRoute,
  currentRoute,
  collapsedHeight: collapsedHeightProp,
}: UseAnimatedPanelShellOptions<TRoute>) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [showPanel, setShowPanel] = useState(defaultOpen);
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const collapsedHeight = collapsedHeightProp ?? getDefaultCollapsedHeight(layout);
  const [animatedHeight, setAnimatedHeight] = useState(collapsedHeight);
  const observeContentRef = useRef(false);
  const rootHeightCacheRef = useRef<number | null>(null);

  const measureContentHeight = useCallback(() => {
    const content = contentRef.current;
    if (!content) return collapsedHeight;
    return content.offsetHeight;
  }, [collapsedHeight]);

  useEffect(() => {
    if (!showPanel || !isOpen) return;

    observeContentRef.current = false;
    let cancelled = false;

    if (heightMode === "viewport") {
      const frame = requestAnimationFrame(() => {
        if (cancelled) return;
        setAnimatedHeight(getViewportPanelHeightPx(layout));
        window.setTimeout(() => {
          if (!cancelled) observeContentRef.current = true;
        }, uiTransition.durationMs.medium);
      });

      return () => {
        cancelled = true;
        cancelAnimationFrame(frame);
      };
    }

    const applyContentHeight = () => {
      if (cancelled) return;

      const measured = measureContentHeight();
      const cached = rootHeightCacheRef.current;
      const next =
        measured > collapsedHeight ? measured : cached != null ? cached : collapsedHeight;

      setAnimatedHeight(next);

      if (currentRoute === rootRoute && next > collapsedHeight) {
        rootHeightCacheRef.current = next;
      }

      window.setTimeout(() => {
        if (!cancelled) observeContentRef.current = true;
      }, uiTransition.durationMs.medium);
    };

    const returningToRoot =
      currentRoute === rootRoute && rootHeightCacheRef.current != null;

    if (returningToRoot) {
      setAnimatedHeight(rootHeightCacheRef.current!);

      const timeoutId = window.setTimeout(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(applyContentHeight);
        });
      }, ROOT_RETURN_SETTLE_MS);

      return () => {
        cancelled = true;
        clearTimeout(timeoutId);
      };
    }

    const frame = requestAnimationFrame(() => {
      applyContentHeight();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [
    showPanel,
    isOpen,
    heightMode,
    currentRoute,
    rootRoute,
    layout,
    measureContentHeight,
    collapsedHeight,
  ]);

  useEffect(() => {
    if (!showPanel || !isOpen || heightMode !== "content") return;

    const content = contentRef.current;
    if (!content) return;

    const syncContentHeight = () => {
      if (!observeContentRef.current) return;

      const measured = measureContentHeight();
      if (measured <= collapsedHeight) return;

      setAnimatedHeight(measured);

      if (currentRoute === rootRoute) {
        rootHeightCacheRef.current = measured;
      }
    };

    const observer = new ResizeObserver(syncContentHeight);
    observer.observe(content);

    return () => observer.disconnect();
  }, [
    showPanel,
    isOpen,
    heightMode,
    currentRoute,
    rootRoute,
    measureContentHeight,
    collapsedHeight,
  ]);

  useEffect(() => {
    if (!showPanel || !isOpen || heightMode !== "viewport") return;

    const syncViewportHeight = () => {
      setAnimatedHeight(getViewportPanelHeightPx(layout));
    };

    window.addEventListener("resize", syncViewportHeight);
    return () => window.removeEventListener("resize", syncViewportHeight);
  }, [showPanel, isOpen, heightMode, layout]);

  useEffect(() => {
    if (!isOpen) {
      rootHeightCacheRef.current = null;
    }
  }, [isOpen]);

  const open = useCallback(() => {
    observeContentRef.current = false;
    setShowPanel(true);
    setAnimatedHeight(collapsedHeight);
    setIsOpen(true);
  }, [collapsedHeight]);

  const close = useCallback(() => {
    observeContentRef.current = false;
    rootHeightCacheRef.current = null;
    setAnimatedHeight(collapsedHeight);
    setIsOpen(false);
    window.setTimeout(() => setShowPanel(false), uiTransition.durationMs.medium);
  }, [collapsedHeight]);

  const toggle = useCallback(() => {
    if (isOpen) close();
    else open();
  }, [isOpen, open, close]);

  return {
    contentRef,
    showPanel,
    isOpen,
    animatedHeight,
    open,
    close,
    toggle,
  };
}
