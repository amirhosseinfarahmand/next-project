import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/dist/client/router";

const CustomPagination = ({
  numOfCount = 10,
  setSearchData,
  setSearchTvData,
  setItemShow,
}) => {
  const router = useRouter();

  const handelChangePage = (page) => {
    if (router.pathname === "/[page]") {
      window.scroll(0, 0);
      setItemShow(false);
      router.push(`/${page}`);
      setSearchData([]);
    }
    if (router.pathname === "/allMovies/[page]") {
      window.scroll(0, 0);

      router.push(`/allMovies/${page}`);
      setSearchData([]);
    }
    if (router.pathname === "/allTV/[page]") {
      window.scroll(0, 0);

      router.push(`/allTV/${page}`);
      setSearchTvData([]);
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#FF8F00",
      },
      text: {
        primary: "#FFFFFF",
      },
    },
  });

  return (
    <div>
      <div className="hidden md:flex ">
        <ThemeProvider theme={theme}>
          <Pagination
            onChange={(_, e) => handelChangePage(e)}
            count={numOfCount}
            color="primary"
            size="medium"
          />
        </ThemeProvider>
      </div>
      <div className=" md:hidden mb-5">
        <ThemeProvider theme={theme}>
          <Pagination
            onChange={(e) => handelChangePage(e.target.textContent)}
            count={numOfCount}
            color="primary"
            size="small"
          />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default CustomPagination;
