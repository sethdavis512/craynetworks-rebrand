import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { cn } from "../../lib/cn";

type AvatarProps = {
  src?: string;
  alt?: string;
  fallback: string;
  className?: string;
};

export function Avatar({ src, alt, fallback, className }: AvatarProps) {
  return (
    <BaseAvatar.Root
      className={cn(
        "inline-flex size-10 select-none items-center justify-center overflow-hidden rounded-full bg-surface-2 font-sans text-sm font-medium text-muted",
        className,
      )}
    >
      {src ? <BaseAvatar.Image src={src} alt={alt} className="size-full object-cover" /> : null}
      <BaseAvatar.Fallback>{fallback}</BaseAvatar.Fallback>
    </BaseAvatar.Root>
  );
}
