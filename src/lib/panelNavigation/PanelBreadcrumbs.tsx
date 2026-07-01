import { cn } from "@/lib/cn";

export type PanelBreadcrumbItem = {
  label: string;
  onClick?: () => void;
};

type PanelBreadcrumbsProps = {
  items: PanelBreadcrumbItem[];
  ariaLabel?: string;
  className?: string;
};

const inactiveClass = "text-text-primary opacity-50";
const linkClass =
  "cursor-pointer text-text-primary opacity-90 transition-opacity hover:opacity-100 dark:opacity-100 dark:hover:opacity-80";

export function PanelBreadcrumbs({
  items,
  ariaLabel = "Panel navigation",
  className,
}: PanelBreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label={ariaLabel} className={cn("min-w-0 text-sm font-normal", className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={`${item.label}-${index}`}>
            {index > 0 ? (
              <span aria-hidden className={cn("mx-1.5", inactiveClass)}>
                /
              </span>
            ) : null}
            {isLast || !item.onClick ? (
              <span className={inactiveClass}>{item.label}</span>
            ) : (
              <button type="button" onClick={item.onClick} className={linkClass}>
                {item.label}
              </button>
            )}
          </span>
        );
      })}
    </nav>
  );
}
