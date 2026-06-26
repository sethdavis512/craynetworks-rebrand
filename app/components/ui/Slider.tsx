import type { ComponentPropsWithoutRef } from "react";
import { Slider as BaseSlider } from "@base-ui/react/slider";
import { cn } from "../../lib/cn";

type SliderProps = ComponentPropsWithoutRef<typeof BaseSlider.Root>;

export function Slider({ className, ...props }: SliderProps) {
  return (
    <BaseSlider.Root className={cn("w-full", className)} {...props}>
      <BaseSlider.Control className="flex h-5 w-full touch-none items-center">
        <BaseSlider.Track className="h-1.5 w-full rounded-full bg-border">
          <BaseSlider.Indicator className="rounded-full bg-primary" />
          <BaseSlider.Thumb className="size-4 rounded-full bg-primary shadow outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" />
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
