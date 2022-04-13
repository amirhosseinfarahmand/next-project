import Head from "next/head";
import Link from "next/link";
import Header from "../../components/Header";
import Nav from "../../components/Nav";
import { useState } from "react";
import MainBox from "../../components/MainBox";
import { useGenreAction, useGenre } from "../../provider/GenreProvider";

export default function Home({
  data,
  movieGunres,
  tvData,
  seriesGenres,
  topRatedMovies,
}) {
  const [show, setShow] = useState(false);
  const [state, setState] = useState(data.results);
  const [backState, setBackState] = useState(data.results);
  const setGenre = useGenreAction();
  const [tvState, setTvState] = useState(tvData.results);
  const [allMovie, setAllMovie] = useState(data.results);

  return (
    <div>
      <Head>
        <title>hulu</title>
      </Head>
      <Header
        setShow={setShow}
        setTvState={setTvState}
        tvState={tvData.results}
        setAllMovie={setAllMovie}
        setState={setState}
        backState={data.results}
      />
      <Nav
        urlMovie="moviesGenre"
        urlSerie="seriesGenre"
        state={data.results}
        setTvState={setTvState}
        tvData={tvData.results}
        setState={setState}
        show={show}
        setAllMovie={setAllMovie}
        setShow={setShow}
        backState={data.results}
        movieGunres={movieGunres}
        seriesGenres={seriesGenres}
        topRatedMovies={topRatedMovies}
      />
      <div className=" h-24 bg-stone-900 shadow-lg shadow-stone-500 flex justify-center items-center">
        <p className="text-[25px] " style={{ fontFamily: "cursive" }}>
          All movies
        </p>
      </div>

      <MainBox state={allMovie} />
      <div className="my-10 flex justify-center">
        <Link href="/allMovies/1">
          <p className="text-[18px] font-mono bg-[#D97706] shadow-lg shadow-amber-500 p-3 rounded-lg cursor-pointer hover:scale-110 hover:">
            Click for more Movies
          </p>
        </Link>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const data = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=e9b577e54e388326146a10c5441ab9a3`
  ).then((res) => res.json());

  const tvData = await fetch(
    `https://api.themoviedb.org/3/trending/tv/day?api_key=e9b577e54e388326146a10c5441ab9a3`
  ).then((res) => res.json());

  const movieGunres = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=e9b577e54e388326146a10c5441ab9a3&language=en-US"
  ).then((res) => res.json());

  const seriesGenres = await fetch(
    "https://api.themoviedb.org/3/genre/tv/list?api_key=e9b577e54e388326146a10c5441ab9a3&language=en-US"
  ).then((res) => res.json());

  const popularMovies = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=e9b577e54e388326146a10c5441ab9a3&language=en-US&page=1`
  ).then((res) => res.json());

  const topRatedMovies = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=e9b577e54e388326146a10c5441ab9a3&language=en-US&page=1`
  ).then((res) => res.json());

  return {
    props: {
      data,
      movieGunres,
      tvData,
      seriesGenres,
      topRatedMovies,
    },
  };
};
