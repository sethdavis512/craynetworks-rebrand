import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("admin", "routes/admin.tsx", [
    index("routes/admin.index.tsx"),
    route("components", "routes/components.tsx", [
      index("routes/components.index.tsx"),
      route(":slug", "routes/components.detail.tsx"),
    ]),
    route("colophon", "routes/colophon.tsx"),
    route("studio", "routes/studio.tsx"),
    route("before-after", "routes/before-after.tsx"),
  ]),
] satisfies RouteConfig;
