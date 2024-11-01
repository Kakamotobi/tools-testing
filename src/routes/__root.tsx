import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link
          to="/"
          activeOptions={{ exact: true }}
          activeProps={{ style: { fontWeight: "bold", color: "cyan" } }}
        >
          Home
        </Link>{" "}
        |{" "}
        <Link
          to="/swr"
          search={{ _page: 0, _limit: 5 }}
          activeOptions={{ includeSearch: false }}
          activeProps={{ style: { fontWeight: "bold", color: "cyan" } }}
        >
          SWR
        </Link>{" "}
        |{" "}
        <Link
          to="/react-query"
          search={{ _page: 0, _limit: 5 }}
          activeOptions={{ includeSearch: false }}
          activeProps={{ style: { fontWeight: "bold", color: "cyan" } }}
        >
          React Query
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
  notFoundComponent: () => "404 Not Found",
});
