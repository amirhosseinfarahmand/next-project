import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { CalendarIcon } from "@heroicons/react/outline";

const MovieBox = ({ items, genres }) => {
  const img_300 = "https://image.tmdb.org/t/p/w500";
  const [state, setState] = useState({
    genres: [],
    release_date: [],
    first_air_date: [],
  });
  const router = useRouter();
  // console.log(router);
  useEffect(() => {
    const fetch = async () => {
      if (
        router.pathname === "/" ||
        router.pathname === "/moviesGenre/[index]" ||
        router.pathname === "/allMovies" ||
        router.pathname === "/[page]" ||
        router.pathname === "/allMovies/[page]"
      ) {
        try {
          const { data } = await axios.get(
            `https://api.themoviedb.org/3/movie/${items.id}?api_key=e9b577e54e388326146a10c5441ab9a3&language=en-US`
          );
          setState(data);
        } catch (error) {
          console.log("movie error");
        }
      }
      if (
        router.pathname === "/allTV" ||
        router.pathname === "/seriesGenre/[index]" ||
        router.pathname === "/" ||
        router.pathname === "/[page]" ||
        router.pathname === "/allTV/[page]"
      ) {
        try {
          const { data } = await axios.get(
            `https://api.themoviedb.org/3/tv/${items.id}?api_key=e9b577e54e388326146a10c5441ab9a3&language=en-US`
          );
          setState(data);
        } catch (error) {
          console.log("series error");
        }
      }
    };

    fetch();
  }, [router.query.page]);

  return (
    <div
      className="boxItem flex flex-col relative"
      style={{
        margin: "15px",
        transition: "1/2s",
        borderRadius: "5%",
      }}
    >
      <div className="div absolute" />
      <Image
        src={`${img_300}${items.poster_path}`}
        className="pic"
        width={240}
        height={300}
      />
      <div className="score absolute ml-5">
        <span className=" text-[#ffc107]" style={{ fontSize: "20px" }}>
          {items.vote_average}
        </span>
        /10
      </div>

      <div
        className="genreBox absolute flex  w-full  "
        style={{ height: "30%", marginTop: "30%" }}
      >
        <div className="test flex flex-wrap justify-center w-full h-full items-center">
          {state.genres.map((genre, index) => (
            <p
              key={index}
              className=" rounded-md m-1 transition"
              style={{
                fontSize: "12px",
                fontWeight: "500",
                margin: "4px",
                backgroundColor: "#7F1D1D",
                padding: "5px",
                transition: "2s",
              }}
            >
              {genre.name}
            </p>
          ))}
        </div>
        <div
          className="flex items-center"
          style={{ marginTop: "28%", marginLeft: "28%" }}
        >
          <CalendarIcon width={18} height={18} />
          <p className="data text-center text-normal ml-1">
            {state.release_date || state.first_air_date}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieBox;
