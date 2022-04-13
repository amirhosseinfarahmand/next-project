import Image from "next/image";
import useScrollPosition from "@react-hook/window-scroll";
import { useRouter } from "next/router";
import {
  HomeIcon,
  SearchIcon,
  LoginIcon,
  UserIcon,
  XIcon,
} from "@heroicons/react/outline";
import HeaderItem from "./HeaderItem";
import { useState } from "react";
import { useGenreAction } from "../provider/GenreProvider";
import { useActionSeries } from "../provider/SeriesProvider";
import Signup from "./SignUp";
import Login from "./Login";

const img =
  "https://sites.duke.edu/dukeiff/files/2020/10/493f5bba-81a4-11e9-bf79-066b49664af6_cm_1440w.png";

const Header = ({
  setShow,
  state,
  setState,
  backState,
  tvState,
  setTvState,
  setAllMovie,
  setSearchData,
  setSearchTvData,
}) => {
  const [value, setValue] = useState("");
  const [form, setForm] = useState(false);
  const [login, setLogin] = useState(false);
  const y = useScrollPosition(60);

  const searchChange = (e) => {
    setValue(e.target.value);
  };

  const router = useRouter();
  const setMovieGenre = useGenreAction();
  const setSeriesGenre = useActionSeries();

  const search = () => {
    if (value === "") {
      router.push("/");
    } else {
      const filter1 = tvState.filter((state) => {
        return state.original_name.toLowerCase().includes(value.toLowerCase());
      });
      const filter2 = backState.filter((state) => {
        return state.original_title.toLowerCase().includes(value.toLowerCase());
      });

      setTvState(filter1);
      setState(filter2.concat(filter1));
      setMovieGenre(filter2);
      setSeriesGenre(filter1);

      if (
        router.pathname === "/allMovies" ||
        router.pathname === "/allMovies/[page]"
      ) {
        setState(filter2);
        setAllMovie(filter2);
        setSearchData(filter2);
      }
      if (router.pathname === "/allTV" || router.pathname === "/allTV/[page]") {
        setState(filter1);
        setTvState(filter1);
        setSearchTvData(filter1);
      }
      if (router.pathname === "/[page]") {
        const filter1 = tvState.filter((state) => {
          return state.original_name
            .toLowerCase()
            .includes(value.toLowerCase());
        });
        const filter2 = backState.filter((state) => {
          return state.original_title
            .toLowerCase()
            .includes(value.toLowerCase());
        });
        setSearchData(filter1.concat(filter2));
      }
    }
    setValue("");
  };

  const homeClick = () => {
    router.push("/");
    setTvState(tvState);
    setState(backState);
  };

  console.log(y);
  return (
    <header className="flex  sm:flex-row bg-black  justify-between items-center">
      <div className="grid w-full  bg-black  sm:flex  sm:w-full sm:justify-between">
        <div className="flex mt-5 ml-5 ">
          <div onClick={() => homeClick()}>
            <HeaderItem title="Home" Icon={HomeIcon} />
          </div>
          <div onClick={() => setForm(true)}>
            <HeaderItem title="SignUp" Icon={UserIcon} />
          </div>
          <div onClick={() => setLogin(true)}>
            <HeaderItem title="Login" Icon={LoginIcon} />
          </div>
        </div>

        <div className="flex flex-col my-5 sm:flex-row-reverse  items-center bg-black">
          <div
            style={{ fontFamily: "cursive" }}
            className="md:w-[100px] hidden md:h-10 cursor-pointer  md:flex justify-center items-center md:bg-[#27272A]  md:text-white md:rounded-md md:mr-[100px] md:text-center"
            onMouseOver={() => setShow(true)}
            onMouseOut={() => setShow(false)}
          >
            Category
          </div>

          <div className="flex lg:mr-[200px] ml-auto cursor-pointer">
            <SearchIcon
              onClick={search}
              width={30}
              height={30}
              className="bg-[#18181B]  border-[#27272A]  h-8 cursor-pointer p-1 rounded-l-md "
            />
            <input
              type="text"
              value={value}
              onChange={searchChange}
              placeholder="write your movie....."
              className="h-8 input   sm:w-[280px] outline-0 text-center text-white  bg-[#18181B]"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-auto sm:mb-0 ">
        <Image src={img} width="100%" height={50} className="object-contain " />
      </div>
      {form ? (
        <div
          className="fixed bg-opacity-50 bg-black w-full h-full top-0"
          style={{ zIndex: "100" }}
        >
          <Signup setForm={setForm} />
        </div>
      ) : (
        ""
      )}
      {login ? (
        <div
          className="fixed bg-opacity-50 bg-black w-full h-full top-0"
          style={{ zIndex: "100" }}
        >
          <Login setLogin={setLogin} />
        </div>
      ) : (
        ""
      )}
    </header>
  );
};

export default Header;
