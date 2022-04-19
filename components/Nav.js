import { useEffect } from "react";
import { useState, useRef } from "react";
import axios from "axios";
import NavBox from "./NavBox";
import Highlight from "react-highlight";
import Carousel from "react-elastic-carousel";
import { FaImdb } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { useGenreAction } from "../provider/GenreProvider";
import { useActionSeries } from "../provider/SeriesProvider";
import FooterComponenet from "./Footer";
import { Transition } from "react-transition-group";
import {
  useMovieTitleAction,
  useMovieTitle,
} from "../provider/TitileMovieProvider";
import {
  useSerieTitleAction,
  useSerieTitle,
} from "../provider/TitleSerieProvider";

const img_300 = "https://image.tmdb.org/t/p/w300";

const Nav = ({
  state,
  show,
  setShow,
  backState,
  movieGunres,
  setState,
  urlMovie,
  urlSerie,
  seriesGenres,
  tvData,
  setTvState,
  setAllMovie,
  backUp,
  setSearchData,
  setSearchTvData,
  ref,
}) => {
  const [gunres, setGunres] = useState([movieGunres.genres]);
  const [seriesGen, setSeriesGen] = useState([seriesGenres.genres]);
  const [collection, setCollection] = useState("none");
  const [best, setBest] = useState("none");
  const [movies, setMovies] = useState("none");
  const [series, setSeries] = useState("none");
  const [imdb, setImdb] = useState("none");
  const [showMenu, setShowMenu] = useState(false);
  const [inProp, setInProp] = useState(false);
  const [collectionProp, setCollectionProp] = useState(false);
  const [MovieProp, setMovieProp] = useState(false);
  const [serieProp, setSerieProp] = useState(false);
  const [imdbProp, setImdbProp] = useState(false);

  const router = useRouter();
  const dispatch = useGenreAction();
  const actionSeries = useActionSeries();
  const setMovieTitle = useMovieTitleAction();
  const setSerieTitle = useSerieTitleAction();
  const movieTitle = useMovieTitle();
  const serieTitle = useSerieTitle();
  const [test, setTest] = useState();

  ///mobile state

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];

  const allMoviesClick = () => {
    setState(backState);
    router.push("/allMovies");
  };

  const allSeriesClick = () => {
    router.push("/allTV");
  };

  const genreClick = (id, name) => {
    const filteredMovies1 = state.filter((state) => state.genre_ids[0] === id);
    const filteredMovies2 = state.filter((state) => state.genre_ids[1] === id);
    const filteredMovies3 = state.filter((state) => state.genre_ids[2] === id);
    const filteredMovies4 = state.filter((state) => state.genre_ids[3] === id);

    setMovieTitle(name);
    dispatch(
      filteredMovies1.concat(filteredMovies2, filteredMovies3, filteredMovies4)
    );
    router.push({ pathname: `/${urlMovie}/${name}` });
  };

  const seriesClick = (id, name) => {
    const filteredSeries1 = tvData.filter((state) => state.genre_ids[0] === id);
    const filteredSeries2 = tvData.filter((state) => state.genre_ids[1] === id);
    const filteredSeries3 = tvData.filter((state) => state.genre_ids[2] === id);
    const filteredSeries4 = tvData.filter((state) => state.genre_ids[3] === id);

    setSerieTitle(name);
    console.log("outSide");
    actionSeries(
      filteredSeries1.concat(filteredSeries2, filteredSeries3, filteredSeries4)
    );
    router.push({ pathname: `/${urlSerie}/${name}` });
  };

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setShow(false);
    } else {
      setShow(false);
    }
  };

  const mouseCollection = () => {
    setCollection("flex");
    setBest("none");
    setMovies("none");
    setSeries("none");
    setImdb("none");
  };

  const mouseMovie = () => {
    setGunres(movieGunres.genres);
    setMovies("flex");
    setBest("none");
    setCollection("none");
    setSeries("none");
    setImdb("none");
  };

  const mouseSeries = () => {
    setSeriesGen(seriesGenres.genres);
    setSeries("flex");
    setMovies("none");
    setBest("none");
    setCollection("none");
    setImdb("none");
  };

  const mouseImdb = () => {
    setImdb("flex");
    setMovies("none");
    setBest("none");
    setCollection("none");
    setSeries("none");
  };

  const imdbOption = [
    { value: "All", label: "All" },
    { value: "4>", label: "above 4" },
    { value: "4-5", label: "4-5" },
    { value: "5>", label: "above 5" },
    { value: "5-6", label: "5-6" },
    { value: "6>", label: "above 6" },
    { value: "6-7", label: "6-7" },
    { value: "7>", label: "above 7" },
    { value: "7-8", label: "7-8" },
    { value: "8>", label: "above 8" },
    { value: "8-9", label: "8-9" },
    { value: "9>", label: "above 9" },
  ];

  const filterImdb = (status) => {
    switch (status) {
      case "4>":
        if (router.pathname === "/allMovies/[page]") {
          setSearchData(state.filter((items) => items.vote_average > 4));
        }

        if (router.pathname === "/allTV/[page]") {
          setSearchTvData(tvData.filter((items) => items.vote_average > 4));
        }

        setState(state.filter((items) => items.vote_average > 4));
        setTvState(tvData.filter((items) => items.vote_average > 4));
        setAllMovie(state.filter((items) => items.vote_average > 4));

        break;
      case "4-5":
        if (router.pathname === "/allTV/[page]") {
          setSearchTvData(
            tvData.filter(
              (items) => items.vote_average >= 4 && items.vote_average <= 5
            )
          );
        }

        if (router.pathname === "/allMovies/[page]") {
          setSearchData(
            state.filter(
              (items) => items.vote_average >= 4 && items.vote_average <= 5
            )
          );
        }

        setState(
          state.filter(
            (items) => items.vote_average >= 4 && items.vote_average <= 5
          )
        );
        setTvState(
          tvData.filter(
            (items) => items.vote_average >= 4 && items.vote_average <= 5
          )
        );
        setAllMovie(
          state.filter(
            (items) => items.vote_average >= 4 && items.vote_average <= 5
          )
        );
        break;
      case "5>":
        if (router.pathname === "/allTV/[page]") {
          setSearchTvData(tvData.filter((items) => items.vote_average > 5));
        }

        if (router.pathname === "/allMovies/[page]") {
          setSearchData(state.filter((items) => items.vote_average > 5));
        }

        setState(state.filter((items) => items.vote_average > 5));
        setTvState(tvData.filter((items) => items.vote_average > 5));
        setAllMovie(state.filter((items) => items.vote_average > 5));
        break;
      case "5-6":
        if (router.pathname === "/allTV/[page]") {
          setSearchTvData(
            tvData.filter(
              (items) => items.vote_average >= 5 && items.vote_average <= 6
            )
          );
        }

        if (router.pathname === "/allMovies/[page]") {
          setSearchData(
            state.filter(
              (items) => items.vote_average >= 5 && items.vote_average <= 6
            )
          );
        }

        setState(
          state.filter(
            (items) => items.vote_average >= 5 && items.vote_average <= 6
          )
        );
        setTvState(
          tvData.filter(
            (items) => items.vote_average >= 5 && items.vote_average <= 6
          )
        );
        setAllMovie(
          state.filter(
            (items) => items.vote_average >= 5 && items.vote_average <= 6
          )
        );
        break;
      case "6>":
        if (router.pathname === "/allTV/[page]") {
          setSearchTvData(tvData.filter((items) => items.vote_average > 6));
        }

        if (router.pathname === "/allMovies/[page]") {
          setSearchData(state.filter((items) => items.vote_average > 6));
        }

        setState(state.filter((items) => items.vote_average > 6));
        setTvState(tvData.filter((items) => items.vote_average > 6));
        setAllMovie(state.filter((items) => items.vote_average > 6));
        break;
      case "6-7":
        if (router.pathname === "/allTV/[page]") {
          setSearchTvData(
            tvData.filter(
              (items) => items.vote_average >= 6 && items.vote_average <= 7
            )
          );
        }

        if (router.pathname === "/allMovies/[page]") {
          setSearchData(
            state.filter(
              (items) => items.vote_average >= 6 && items.vote_average <= 7
            )
          );
        }

        setState(
          state.filter(
            (items) => items.vote_average >= 6 && items.vote_average <= 7
          )
        );
        setTvState(
          tvData.filter(
            (items) => items.vote_average >= 6 && items.vote_average <= 7
          )
        );
        setAllMovie(
          state.filter(
            (items) => items.vote_average >= 6 && items.vote_average <= 7
          )
        );
        break;
      case "7>":
        if (router.pathname === "/allTV/[page]") {
          setSearchTvData(tvData.filter((items) => items.vote_average > 7));
        }

        if (router.pathname === "/allMovies/[page]") {
          setSearchData(state.filter((items) => items.vote_average > 7));
        }

        setState(state.filter((items) => items.vote_average > 7));
        setTvState(tvData.filter((items) => items.vote_average > 7));
        setAllMovie(state.filter((items) => items.vote_average > 7));
        break;
      case "7-8":
        if (router.pathname === "/allTV/[page]") {
          setSearchTvData(
            tvData.filter(
              (items) => items.vote_average >= 7 && items.vote_average <= 8
            )
          );
        }

        if (router.pathname === "/allMovies/[page]") {
          setSearchData(
            state.filter(
              (items) => items.vote_average >= 7 && items.vote_average <= 8
            )
          );
        }

        setState(
          state.filter(
            (items) => items.vote_average >= 7 && items.vote_average <= 8
          )
        );
        setTvState(
          tvData.filter(
            (items) => items.vote_average >= 7 && items.vote_average <= 8
          )
        );
        setAllMovie(
          state.filter(
            (items) => items.vote_average >= 7 && items.vote_average <= 8
          )
        );
        break;
      case "8>":
        if (router.pathname === "/allTV/[page]") {
          setSearchTvData(tvData.filter((items) => items.vote_average > 8));
        }

        if (router.pathname === "/allMovies/[page]") {
          setSearchData(state.filter((items) => items.vote_average > 8));
        }

        setState(state.filter((items) => items.vote_average > 8));
        setTvState(tvData.filter((items) => items.vote_average > 8));
        setAllMovie(state.filter((items) => items.vote_average > 8));
        break;
      case "8-9":
        if (router.pathname === "/allTV/[page]") {
          setSearchTvData(
            tvData.filter(
              (items) => items.vote_average >= 8 && items.vote_average <= 9
            )
          );
        }

        if (router.pathname === "/allMovies/[page]") {
          setSearchData(
            state.filter(
              (items) => items.vote_average >= 8 && items.vote_average <= 9
            )
          );
        }

        setState(
          state.filter(
            (items) => items.vote_average >= 8 && items.vote_average <= 9
          )
        );
        setTvState(
          tvData.filter(
            (items) => items.vote_average >= 8 && items.vote_average <= 9
          )
        );
        setAllMovie(
          state.filter(
            (items) => items.vote_average >= 8 && items.vote_average <= 9
          )
        );
        break;
      case "9>":
        if (router.pathname === "/allTV/[page]") {
          setSearchTvData(tvData.filter((items) => items.vote_average > 9));
        }
        if (router.pathname === "/allMovies/[page]") {
          setSearchData(state.filter((items) => items.vote_average > 9));
        }

        setState(state.filter((items) => items.vote_average > 9));
        setTvState(tvData.filter((items) => items.vote_average > 9));
        setAllMovie(state.filter((items) => items.vote_average > 9));
        break;

      default:
        setState(state);
        setTvState(tvData);
        setAllMovie(state);

        if (router.pathname === "/allMovies/[page]") {
          setSearchData(state);
        }

        if (router.pathname === "allTV/[page]") {
          setSearchTvData(tvData);
        }
    }
  };

  const imdbClick = (value) => {
    filterImdb(value);
  };

  const duration = 1000;

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
    padding: 1,
    width: "0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const defaultUltStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
    padding: 1,
    height: "0",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    alignItems: "center",
  };

  const defaultMovietStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
    padding: 1,
    height: "0",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
  };

  const transitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1, width: "70%" },
    exiting: { opacity: 1, width: "70%" },
    exited: { opacity: 0 },
  };

  const transitionUlStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1, height: "auto", maxHeight: "80px" },
    exiting: { opacity: 1, height: "auto", maxHeight: "80px" },
    exited: { opacity: 0 },
  };

  const transitionCollecttionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1, height: "auto" },
    exiting: { opacity: 1, height: "auto" },
    exited: { opacity: 0 },
  };

  return (
    <nav className="flex justify-center h-85  p-5 bg-[#27272A] w-full bg-opacity-50  px-10 text-2xl relative">
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="lg:absolute hidden lg:w-[600px] lg:rounded-md allCol lg:h-[300px] lg:bg-black lg:left-[50%] lg:bottom-[94px] lg:z-10 lg:flex lg:flex-row-reverse lg:p-5 "
        style={
          show
            ? {
                pointerEvents: "visible",
                background: "rgba(0, 0, 0, 0.8)",
                transition: "1s",
              }
            : { pointerEvents: "none", opacity: "0", transition: "3s" }
        }
      >
        <div className="col1">
          <ul className="flex flex-col items-center justify-center">
            <li className="collection" onMouseEnter={mouseCollection}>
              Collection
            </li>
            <li className="movies" onMouseEnter={mouseMovie}>
              Movies
            </li>
            <li className="series" onMouseEnter={mouseSeries}>
              Sereis
            </li>
            {router.pathname === "/moviesGenre/[index]" ||
            router.pathname === "/seriesGenre/[index]" ? (
              ""
            ) : (
              <li
                className="whitespace-nowrap"
                onMouseEnter={() => mouseImdb()}
              >
                imdb score
              </li>
            )}
          </ul>
        </div>
        <div className="col2 h-full w-[1px]  bg-white mx-5" />
        <div className="col3">
          <ul
            style={{ display: `${collection}` }}
            onMouseEnter={() => setCollection("flex")}
            className="z-50"
          >
            <li
              onClick={() => allMoviesClick()}
              className="m-1 bg-stone-700 rounded-md text-normal opacity-90 text-[15px] "
            >
              All Movies
            </li>
            <li
              onClick={() => allSeriesClick()}
              className="m-1 bg-stone-700 rounded-md text-normal opacity-90 text-[15px] "
            >
              All Series
            </li>
          </ul>
          <ul
            style={{ display: `${movies}` }}
            className="flex-wrap items-center justify-center text-[15px] mt-7"
          >
            {gunres.map((g) => (
              <li
                className="bg-stone-700 m-1 rounded-md text-normal opacity-90"
                onClick={() => genreClick(g.id, g.name)}
                ref={ref}
              >
                {g.name}
              </li>
            ))}
          </ul>
          <ul
            style={{ display: `${series}` }}
            className="flex-wrap items-center justify-center text-[15px] mt-7"
          >
            {seriesGen.map((s) => (
              <li
                className="m-1 bg-stone-700 rounded-md text-normal opacity-90 text-[15px] "
                onClick={() => seriesClick(s.id, s.name)}
              >
                {s.name}
              </li>
            ))}
          </ul>
          <ul
            className="flex-wrap items-center justify-center"
            style={{ display: `${imdb}`, marginTop: "60px" }}
          >
            {imdbOption.map((state) => (
              <li
                className="m-1 bg-stone-700 rounded-md text-normal opacity-90 text-[15px] "
                onClick={() => imdbClick(state.value)}
              >
                {state.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="tst w-full flex justify-center items-center ">
        <Carousel
          itemsToShow={3}
          enableAutoPlay={true}
          autoPlaySpeed={2500}
          breakPoints={breakPoints}
        >
          {backState.slice(0, 8).map((item) => (
            <div>
              <div
                className={`parent flex flex-col  text-sm  items-center relative`}
              >
                <img
                  src={`${img_300}${item.poster_path}`}
                  className="  w-[200px] h-[300px] rounded-md "
                />
                <p className=" flex text-center bg-black absolute justify-center text-white w-full text-[14px] rounded-t-md h-10 items-center opacity-70 ">
                  {item.original_title || item.original_name}
                </p>
                <div className="absolute  w-full h-full flex flex-col justify-end items-center">
                  <div className="flex  justify-center  items-center bg-black rounded-b-md w-full">
                    <img
                      src="https://i.ibb.co/JjzFV0X/imdb-logo-png-2.png"
                      className=" rounded-sm h-4 w-14"
                    />

                    <p className="  text-[15px] text-[#ffc107] font-sans ml-1">
                      {item.vote_average}
                      <span className="text-[10px] text-white font-Times NewRoma">
                        /10
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="w-full flex fixed bottom-0 right-0 z-50">
        <FooterComponenet
          setShowMenu={setShowMenu}
          setInProp={setInProp}
          inProp={inProp}
          showMenu={showMenu}
        />
      </div>

      <Transition in={inProp} timeout={300}>
        {(state) => (
          <div
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
            className="  overflow-scroll z-40 bg-[url('../images/black1.jpg')] flex flex-col items-center justify-evenly h-full right-0 bottom-0 fixed"
          >
            <div className="text-center overflow-hidden w-full bg-[#171717] p-2 rounded-[10px]">
              <p
                style={{ fontFamily: "cursive" }}
                onClick={() => setCollectionProp(!collectionProp)}
              >
                Collection
              </p>
              <Transition in={collectionProp} timeout={1000}>
                {(state) => (
                  <ul
                    className="  text-lg  overflow-hidden rounded-[10px]"
                    style={{
                      ...defaultUltStyle,
                      ...transitionCollecttionStyles[state],
                    }}
                  >
                    <li
                      className="text-[12px] text-black bg-amber-600 mt-1 rounded-[15px] text-normal opacity-90"
                      onClick={() => allMoviesClick()}
                    >
                      All Movies
                    </li>
                    <li
                      className="text-[12px] text-black bg-amber-600 mt-1 rounded-[15px] text-normal ml-1 opacity-90"
                      onClick={() => allSeriesClick()}
                    >
                      All Series
                    </li>
                  </ul>
                )}
              </Transition>
            </div>
            <div className=" bg-[#171717] text-center overflow-hidden p-2 rounded-[10px]">
              <p
                style={{ fontFamily: "cursive" }}
                onClick={() => setMovieProp(!MovieProp)}
              >
                Movies
              </p>
              <Transition in={MovieProp} timeout={1000}>
                {(state) => (
                  <ul
                    className=" flex flex-wrap justify-center mt-1 overflow-scroll  rounded-[10px]"
                    style={{
                      ...defaultMovietStyle,
                      ...transitionUlStyles[state],
                    }}
                  >
                    {movieGunres.genres.map((state) => (
                      <li
                        className="text-[12px] text-black bg-amber-600 opacity-90 m-1 rounded-[15px]"
                        onClick={() => genreClick(state.id, state.name)}
                      >
                        {state.name}
                      </li>
                    ))}
                  </ul>
                )}
              </Transition>
            </div>
            <div className="text-center bg-[#171717] p-2 rounded-[10px]">
              <p
                style={{ fontFamily: "cursive" }}
                onClick={() => setSerieProp(!serieProp)}
              >
                Series
              </p>
              <Transition in={serieProp} timeout={1000}>
                {(state) => (
                  <ul
                    className=" flex flex-wrap justify-center mt-1 overflow-scroll rounded-[10px]"
                    style={{
                      ...defaultMovietStyle,
                      ...transitionUlStyles[state],
                    }}
                  >
                    {seriesGenres.genres.map((state) => (
                      <li
                        className="text-[12px] text-black bg-amber-600 opacity-90 m-1 rounded-[15px]"
                        onClick={() => seriesClick(state.id, state.name)}
                      >
                        {state.name}
                      </li>
                    ))}
                  </ul>
                )}
              </Transition>
            </div>
            {router.pathname === "/moviesGenre/[index]" ||
            router.pathname === "/seriesGenre/[index]" ? (
              ""
            ) : (
              <div className="w-full mb-4 overflow-hidden bg-[#171717] p-2 rounded-[10px] text-center">
                <p
                  style={{ fontFamily: "cursive" }}
                  className="whitespace-nowrap"
                  onClick={() => setImdbProp(!imdbProp)}
                >
                  Imdb Score
                </p>
                <Transition in={imdbProp} timeout={1000}>
                  {(state) => (
                    <ul
                      className="flex flex-wrap justify-center mt-1 overflow-scroll rounded-[10px]"
                      style={{
                        ...defaultMovietStyle,
                        ...transitionUlStyles[state],
                      }}
                    >
                      {imdbOption.map((state) => (
                        <li
                          className="text-[12px]  text-black bg-amber-600 opacity-90 m-1 rounded-[15px]"
                          onClick={() => imdbClick(state.value)}
                        >
                          {state.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </Transition>
              </div>
            )}
          </div>
        )}
      </Transition>
    </nav>
  );
};

export default Nav;
