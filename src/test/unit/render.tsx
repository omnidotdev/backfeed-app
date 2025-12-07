import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ThemeProvider from "@/providers/ThemeProvider";

type RenderWithRouterOptions = {
  route?: string;
  routerOptions?: Parameters<typeof createRouter>[0];
};

export function renderWithRouter(
  ui?: React.ReactElement,
  options: RenderWithRouterOptions = {},
) {
  const { route = "/", routerOptions = {} } = options;

  const memoryHistory = createMemoryHistory({
    initialEntries: [route],
  });

  const rootRoute = createRootRoute({});
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    // TODO: determine if we need to be able to make `theme` dynamic
    component: () => <ThemeProvider theme="light">{ui}</ThemeProvider>,
  });

  const router = createRouter({
    routeTree: rootRoute.addChildren([indexRoute]),
    history: memoryHistory,
    defaultPendingMinMs: 0, // Critical for test performance
    ...routerOptions,
  });

  function Wrapper() {
    return <RouterProvider router={router} />;
  }

  return {
    router,
    user: userEvent.setup(),
    ...render(ui, { wrapper: Wrapper }),
  };
}
