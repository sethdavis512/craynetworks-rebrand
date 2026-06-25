import { cn } from "../../lib/cn";
import { Facebook } from "./Facebook";
import { Google } from "./Google";
import { Yelp } from "./Yelp";
import { Thumbtack } from "./Thumbtack";
import { LinkedIn } from "./LinkedIn";

/** Composed social row for the footer. */
export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <Facebook />
      <LinkedIn />
      <Yelp />
      <Thumbtack />
      <Google />
    </div>
  );
}
