import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import Nav from "../components/Nav";
import { useState, useEffect } from "react";
import MainBox from "../components/MainBox";
import CustomPagination from "../components/CustomPagination";

export default function Home({
  data,
  movieGunres,
  tvData,
  seriesGenres,
  backUp,
}) {
  const [show, setShow] = useState(false);
  const [state, setState] = useState(data.results);
  const [tvState, setTvState] = useState(tvData.results);
  const [allMovie, setAllMovie] = useState(data.results);
  const [searchData, setSearchData] = useState([]);
  const [itemShow, setItemShow] = useState(false);

  console.log(searchData);
  return (
    <div>
      <Head>
        <title>hulu</title>
      </Head>
      <Header
        setShow={setShow}
        setTvState={setTvState}
        tvState={tvData.results}
        setState={setState}
        backState={data.results}
        setSearchData={setSearchData}
      />
      <Nav
        urlMovie="moviesGenre"
        urlSerie="seriesGenre"
        state={data.results}
        tvData={tvData.results}
        setTvState={setTvState}
        setState={setState}
        setAllMovie={setAllMovie}
        show={show}
        setSearchData={setSearchData}
        backUp={backUp.results}
        setShow={setShow}
        backState={backUp.results}
        movieGunres={movieGunres}
        seriesGenres={seriesGenres}
        setItemShow={setItemShow}
      />
      <div className=" h-24 bg-stone-900 shadow-lg shadow-stone-500 flex justify-center items-center">
        <p className="text-[25px] font-Georgia">All Movies and All Series</p>
      </div>

      <MainBox
        state={itemShow ? searchData : data.results.concat(tvData.results)}
      />

      <div className="my-10 flex justify-center">
        <CustomPagination
          setSearchData={setSearchData}
          setItemShow={setItemShow}
        />
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const { params } = context;
  const { page } = params;
  const data = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=e9b577e54e388326146a10c5441ab9a3&page=${page}`
  ).then((res) => res.json());

  const backUp = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=e9b577e54e388326146a10c5441ab9a3&`
  ).then((res) => res.json());

  const tvData = await fetch(
    `https://api.themoviedb.org/3/trending/tv/day?api_key=e9b577e54e388326146a10c5441ab9a3&page=${page}`
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
      backUp,
    },
  };
};
