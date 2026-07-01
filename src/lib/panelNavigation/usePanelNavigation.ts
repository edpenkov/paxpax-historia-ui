"use client";

import { getNavigateDirection } from "@/lib/panelNavigation/getNavigateDirection";
import type { PanelNavigateAxis, PanelNavigateDirection } from "@/lib/panelNavigation/types";
import { useCallback, useState } from "react";

type UsePanelNavigationOptions<TRoute extends string, TContext = undefined> = {
  root: TRoute;
  getDepth: (route: TRoute) => number;
  resolveAxis?: (from: TRoute, to: TRoute, context: TContext) => PanelNavigateAxis;
  context?: TContext;
  onRouteChange?: (route: TRoute) => void;
};

export function usePanelNavigation<TRoute extends string, TContext = undefined>({
  root,
  getDepth,
  resolveAxis = () => "x",
  context,
  onRouteChange,
}: UsePanelNavigationOptions<TRoute, TContext>) {
  const [route, setRoute] = useState<TRoute>(root);
  const [direction, setDirection] = useState<PanelNavigateDirection>("forward");
  const [axis, setAxis] = useState<PanelNavigateAxis>("x");

  const navigate = useCallback(
    (to: TRoute) => {
      setDirection(getNavigateDirection(getDepth(route), getDepth(to)));
      setAxis(resolveAxis(route, to, context as TContext));
      setRoute(to);
      onRouteChange?.(to);
    },
    [route, getDepth, resolveAxis, context, onRouteChange],
  );

  const reset = useCallback(() => {
    setDirection("forward");
    setAxis("x");
    setRoute(root);
    onRouteChange?.(root);
  }, [root, onRouteChange]);

  return {
    route,
    direction,
    axis,
    navigate,
    reset,
    isRoot: route === root,
  };
}
