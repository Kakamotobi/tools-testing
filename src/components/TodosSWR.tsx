import useSWR from "swr";
import { getTodosSWR } from "../api";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import styled from "styled-components";
import { TablePagination } from "@mui/material";

const currentRoute = getRouteApi("/swr");

export default function TodosSWR() {
  const { _page, _limit } = currentRoute.useSearch();

  const navigate = useNavigate();

  const { data } = useSWR(
    `/todos?_page=${_page + 1}&_limit=${_limit}`,
    getTodosSWR,
    { suspense: true }
  );

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

    // setRowsPerPage()
    // vs
    navigate({
      to: ".",
      search: { _page: 0, _limit: parseInt(event.target.value, 10) },
    });
  };

  return (
    <StyledTodosSWR>
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
      />
    </StyledTodosSWR>
  );
}

const StyledTodosSWR = styled.div`
  border: 1px solid darkblue;
`;
