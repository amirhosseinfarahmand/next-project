import { useState, useEffect } from "react";
import axios from "axios";

const NavBox = ({ data }) => {
  const [poster, setPoster] = useState({ posters: [{ link: [] }] });
  const img_300 = "https://image.tmdb.org/t/p/w300";

  return (
    <div
      className={`flex flex-col object-cover text-sm w-full relative items-center `}
    >
      <img
        src={`${img_300}${data.poster_path}`}
        className="absolute object-cover h-full w-full"
      />
      <p className="absolute flex bg-black w-full justify-center opacity-70">
        {data.original_title || data.original_name}
      </p>
      <div className="absolute top-[84%] bg-red-800">
        <p>imdb score</p>
        <span>interview</span>
      </div>
    </div>
  );
};

export default NavBox;
