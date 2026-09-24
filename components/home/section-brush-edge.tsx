import { cn } from "@/lib/utils";

const BRUSH_SRC = "/divisor%20de%20secciones.png";

const brushMask = {
  WebkitMaskImage: `url("${BRUSH_SRC}")`,
  maskImage: `url("${BRUSH_SRC}")`,
  WebkitMaskSize: "100% 100%",
  maskSize: "100% 100%",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
} as const;

type SectionBrushEdgeProps = {
  /** Color de la sección que entra, vía `text-*`. */
  className?: string;
  flip?: boolean;
};

export function SectionBrushEdge({ className, flip = false }: SectionBrushEdgeProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 z-10 -translate-y-[calc(100%-2px)]",
        className
      )}
      aria-hidden
    >
      <div
        className={cn(
          "h-16 w-full bg-current md:h-20",
          flip && "-scale-x-100"
        )}
        style={brushMask}
      />
    </div>
  );
}
