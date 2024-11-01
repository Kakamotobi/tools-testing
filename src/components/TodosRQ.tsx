import { getTodos } from "../api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { TablePagination } from "@mui/material";

const currentRoute = getRouteApi("/react-query");

export default function TodosRQ() {
  const { _page, _limit } = currentRoute.useSearch();

  const navigate = useNavigate();

  const { data } = useSuspenseQuery({
    queryKey: ["todos", _page, _limit],
    queryFn: () =>
      getTodos({ _page: (_page + 1).toString(), _limit: _limit.toString() }),
  });

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    navigate({
      to: ".",
      search: { _page: newPage, _limit },
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log("event:", event);
    navigate({
      to: ".",
      search: { _page: 0, _limit: parseInt(event.target.value, 10) },
    });
  };

  return (
    <div>
      <ul>
        {data.map((todo: { id: string; title: string }) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>

      <TablePagination
        component="div"
        page={_page}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 20, 30]}
        rowsPerPage={_limit}
        onRowsPerPageChange={handleChangeRowsPerPage}
        count={100}
        sx={{
          backgroundColor: "cyan",
        }}
      />
    </div>
  );
}
