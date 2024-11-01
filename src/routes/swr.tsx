import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import TodosSWR from "../components/TodosSWR";
import { z } from "zod";

const searchParamsSchema = z.object({
  _page: z.number().catch(0),
  _limit: z.number().catch(5),
});

type SearchParams = z.infer<typeof searchParamsSchema>;

export const Route = createFileRoute("/swr")({
  component: SWR,
  validateSearch: (search): SearchParams => {
    return searchParamsSchema.parse(search);
  },
  onError: (error) => {
    console.log("Route Error:", error);
  },
});

function SWR() {
  return (
    <div className="p-2">
      <h3>SWR</h3>

      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <TodosSWR />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
