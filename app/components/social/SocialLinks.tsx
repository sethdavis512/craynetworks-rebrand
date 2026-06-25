import { cn } from "../../lib/cn";
import { Facebook } from "./Facebook";
import { Google } from "./Google";
import { Yelp } from "./Yelp";

/** Composed social row for the footer. */
export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <Facebook />
      <Google />
      <Yelp />
    </div>
  );
}
