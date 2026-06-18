import { useCallback, useEffect, useRef, useState } from "react";

import cn from "@/lib/utils";

import type {
  ComponentProps,
  MouseEvent as ReactMouseEvent,
  ReactNode,
} from "react";

/**
 * Presentational kanban/board primitives. A drag-agnostic shell shared across
 * apps: consumers render their own data (e.g. feedback posts grouped by status,
 * or tasks grouped by column) and layer interactivity (drag-and-drop) on top via
 * the slots. Keeps board layout/styling, and the momentum drag-to-scroll UX, in
 * one place instead of each app rebuilding it.
 */

interface UseInertialScrollOptions {
  /** Friction coefficient for deceleration (0-1, lower = more friction). */
  friction?: number;
  /** Velocity multiplier during drag. */
  velocityMultiplier?: number;
  /** Minimum velocity threshold to stop animation. */
  minVelocity?: number;
}

/**
 * Inertial (momentum-based) drag-to-scroll for the horizontal board surface,
 * with smooth deceleration after release. Skips dragging when the pointer starts
 * on a draggable card, so it composes with card drag-and-drop.
 */
const useInertialScroll = ({
  friction = 0.87,
  velocityMultiplier = 1.3,
  minVelocity = 0.5,
}: UseInertialScrollOptions = {}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMouseDragging, setIsMouseDragging] = useState(false);

  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  const stopInertia = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  const startInertia = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const animate = () => {
      if (Math.abs(velocityRef.current) < minVelocity) {
        velocityRef.current = 0;
        animationFrameRef.current = null;
        return;
      }

      container.scrollLeft -= velocityRef.current;
      velocityRef.current *= friction;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [friction, minVelocity]);

  const handleMouseDown = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      // do not hijack drag of a card (rfd = react-forbidden-drop / hello-pangea)
      if ((e.target as HTMLElement).closest("[data-rfd-draggable-id]")) return;

      const container = scrollContainerRef.current;
      if (!container) return;

      stopInertia();
      setIsMouseDragging(true);
      startXRef.current = e.pageX - container.offsetLeft;
      scrollLeftStartRef.current = container.scrollLeft;
      lastXRef.current = e.pageX;
      lastTimeRef.current = performance.now();
      velocityRef.current = 0;
      container.style.cursor = "grabbing";
    },
    [stopInertia],
  );

  const endDrag = useCallback(() => {
    if (!isMouseDragging) return;
    setIsMouseDragging(false);
    const container = scrollContainerRef.current;
    if (container) container.style.cursor = "grab";
    if (Math.abs(velocityRef.current) > minVelocity) startInertia();
  }, [isMouseDragging, minVelocity, startInertia]);

  const handleMouseMove = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      if (!isMouseDragging) return;
      e.preventDefault();

      const container = scrollContainerRef.current;
      if (!container) return;

      const currentTime = performance.now();
      const deltaTime = currentTime - lastTimeRef.current;
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startXRef.current) * velocityMultiplier;
      container.scrollLeft = scrollLeftStartRef.current - walk;

      if (deltaTime > 0) {
        velocityRef.current = ((e.pageX - lastXRef.current) / deltaTime) * 16;
      }
      lastXRef.current = e.pageX;
      lastTimeRef.current = currentTime;
    },
    [isMouseDragging, velocityMultiplier],
  );

  useEffect(() => stopInertia, [stopInertia]);

  return {
    scrollContainerRef,
    isMouseDragging,
    handleMouseDown,
    handleMouseUp: endDrag,
    handleMouseMove,
    handleMouseLeave: endDrag,
  };
};

const boardSurface =
  "-mx-1 flex flex-col gap-4 px-1 pb-4 sm:flex-row sm:items-start sm:gap-4 sm:overflow-x-auto";

interface BoardProps extends ComponentProps<"div"> {
  /** Enable momentum drag-to-scroll on the horizontal surface (default true). */
  enableDragScroll?: boolean;
}

/** Horizontal board surface: columns scroll sideways on desktop, stack on mobile. */
const Board = ({ className, enableDragScroll = true, ...rest }: BoardProps) => {
  const {
    scrollContainerRef,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
  } = useInertialScroll();

  if (!enableDragScroll) {
    return <div className={cn(boardSurface, className)} {...rest} />;
  }

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: presentational drag-to-scroll surface; interactive content is the cards
    <div
      ref={scrollContainerRef}
      className={cn(boardSurface, "sm:cursor-grab sm:select-none", className)}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      {...rest}
    />
  );
};

/** A single column panel. */
const BoardColumn = ({ className, ...rest }: ComponentProps<"div">) => (
  <div
    className={cn(
      "flex w-full flex-col rounded-xl border border-border-subtle bg-[var(--colors-background-subtle)] sm:w-80 sm:shrink-0",
      className,
    )}
    {...rest}
  />
);

interface BoardColumnHeaderProps
  extends Omit<ComponentProps<"div">, "title" | "color"> {
  /** Column title. */
  title: ReactNode;
  /** Dot color (hex/token); ignored when `icon` is provided. */
  color?: string | null;
  /** Leading icon, replacing the color dot. */
  icon?: ReactNode;
  /** Item count shown as a trailing pill. */
  count?: number;
}

/** Column header: a color dot (or icon) + truncated title + optional count pill. */
const BoardColumnHeader = ({
  title,
  color,
  icon,
  count,
  className,
  children,
  ...rest
}: BoardColumnHeaderProps) => (
  <div
    className={cn(
      "flex items-center justify-between gap-2 px-3 py-2.5",
      className,
    )}
    {...rest}
  >
    <div className="flex min-w-0 items-center gap-2">
      {icon ?? (
        <span
          className="size-2.5 shrink-0 rounded-full"
          style={{ backgroundColor: color ?? "var(--colors-neutral-400)" }}
        />
      )}
      <span className="truncate font-semibold text-foreground text-sm">
        {title}
      </span>
    </div>

    {count != null && (
      <span className="shrink-0 rounded-full bg-[var(--colors-card-item)] px-2 py-0.5 font-medium text-foreground-subtle text-xs tabular-nums">
        {count}
      </span>
    )}

    {children}
  </div>
);

/** Column body: holds the cards (or an empty state). */
const BoardColumnBody = ({ className, ...rest }: ComponentProps<"div">) => (
  <div className={cn("flex flex-col gap-2 px-2 pb-2", className)} {...rest} />
);

/** Empty-state placeholder for a column with no items. */
const BoardColumnEmpty = ({ className, ...rest }: ComponentProps<"p">) => (
  <p
    className={cn(
      "rounded-lg border border-border-subtle border-dashed px-3 py-8 text-center text-foreground-subtle text-xs",
      className,
    )}
    {...rest}
  />
);

export {
  Board,
  BoardColumn,
  BoardColumnHeader,
  BoardColumnBody,
  BoardColumnEmpty,
  useInertialScroll,
};
