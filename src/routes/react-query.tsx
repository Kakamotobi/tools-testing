import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import TodosRQ from "../components/TodosRQ";
import { z } from "zod";

const searchParamsSchema = z.object({
  _page: z.number().catch(0),
  _limit: z.number().catch(5),
});

type SearchParams = z.infer<typeof searchParamsSchema>;

export const Route = createFileRoute("/react-query")({
  component: ReactQuery,
  // Ref: https://tanstack.com/router/latest/docs/framework/react/guide/search-params#validating-search-params
  validateSearch: (search): SearchParams => {
    return searchParamsSchema.parse(search);
  },
  onError: (error) => {
    console.log("Route Error:", error);
  },
});

function ReactQuery() {
  return (
    <div className="p-2">
      <h3>React Query</h3>

      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <TodosRQ />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
