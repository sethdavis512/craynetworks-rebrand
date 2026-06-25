import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("components", "routes/components.tsx", [
    index("routes/components.index.tsx"),
    route(":slug", "routes/components.detail.tsx"),
  ]),
] satisfies RouteConfig;
