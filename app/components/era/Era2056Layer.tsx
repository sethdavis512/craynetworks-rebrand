import { useTheme } from "../../theme/ThemeProvider";
import { SpaceField } from "./SpaceField";
import { Era2056Shell } from "./Era2056Shell";
import { CommandPalette } from "./CommandPalette";

/**
 * The global future-OS layer. Mounts the spatial backdrop, the persistent HUD chrome, and the
 * command palette on every route while era is 2056; renders nothing in the present.
 */
export function Era2056Layer() {
  const { state } = useTheme();
  if (state.era !== "2056") return null;
  return (
    <>
      <SpaceField />
      <Era2056Shell />
      <CommandPalette />
    </>
  );
}
