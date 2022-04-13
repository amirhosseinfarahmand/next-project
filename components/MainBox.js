import MovieBox from "../common/MovieBox";
import { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";

const MainBox = ({ state, tvData }) => {
  const [data, setData] = useState(state);
  const router = useRouter();

  console.log(router);

  return (
    <section className="flex flex-wrap justify-center mt-10 ">
      {state.map((data, index) => (
        <MovieBox items={data} key={index} />
      ))}
    </section>
  );
};

export default MainBox;
