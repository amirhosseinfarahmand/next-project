import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import Header from "../../components/Header";
import Nav from "../../components/Nav";
import { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import MainBox from "../../components/MainBox";
import { useGenre, useGenreAction } from "../../provider/GenreProvider";
import { useSeries } from "../../provider/SeriesProvider";
import { useMovieTitle } from "../../provider/TitileMovieProvider";

export default function Home({ data, movieGunres, seriesGenres, tvData }) {
  const [show, setShow] = useState(false);
  const [state, setState] = useState(data.results);
  const filteredGenres = useGenre();
  const dispatch = useGenreAction();
  const router = useRouter();
  const [tvState, setTvState] = useState(tvData.results);
  const movieName = useMovieTitle();

  useEffect(() => {
    dispatch(filteredGenres);
  }, [router.query]);

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
      />
      <Nav
        state={state}
        urlMovie="moviesGenre"
        urlSerie="seriesGenre"
        tvData={tvData.results}
        setState={setState}
        show={show}
        setShow={setShow}
        backState={data.results}
        movieGunres={movieGunres}
        seriesGenres={seriesGenres}
      />
      <div className=" h-24 bg-stone-900 shadow-lg shadow-stone-500 flex justify-center items-center">
        <p className="text-[25px] " style={{ fontFamily: "cursive" }}>
          {movieName}
        </p>
      </div>
      <MainBox state={filteredGenres} />
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
    ` https://api.themoviedb.org/3/movie/top_rated?api_key=e9b577e54e388326146a10c5441ab9a3&language=en-US&page=1`
  ).then((res) => res.json());

  return {
    props: {
      data,
      movieGunres,
      tvData,
      seriesGenres,
    },
  };
};
