import * as yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import Input from "../../common/Input";
import { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import Header from "../../components/Header";
import { useGenreAction, useGenre } from "../../provider/GenreProvider";
import Nav from "../../components/Nav";

const initialValues = {
  name: "",
  email: "",
  password: "",
  passwordConfrim: "",
  phoneNumber: "",
};

const validationSchema = yup.object({
  name: yup
    .string()
    .required("UserName is required!")
    .min(6, "UserName length is not valid!"),
  email: yup
    .string()
    .required("Email is required!")
    .email("Invalid email format!"),
  password: yup
    .string()
    .required("Password is required!")
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase"
    ),
  passwordConfrim: yup
    .string()
    .required("PasswordConfirm required!")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  phoneNumber: yup
    .string()
    .required("PhoneNumber is required!")
    .matches(/^[0-9]{11}$/, "Invalid Phone Number")
    .nullable(),
});

const Signup = ({
  data,
  movieGunres,
  tvData,
  seriesGenres,
  topRatedMovies,
}) => {
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [state, setState] = useState(data.results);
  const [backState, setBackState] = useState(data.results);
  const setGenre = useGenreAction();
  const [tvState, setTvState] = useState(tvData.results);
  const [allMovie, setAllMovie] = useState(data.results);

  const router = useRouter();

  const onSubmit = async (values) => {
    const { name, email, phoneNumber, password } = values;
    const userData = { name, email, phoneNumber, password };
    console.log(values);
    try {
      const { data } = await addData(userData);

      router.push("/");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      }
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  return (
    <div>
      <div>
        <Header
          setShow={setShow}
          setTvState={setTvState}
          tvState={tvData.results}
          setState={setState}
          backState={data.results}
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
          setShow={setShow}
          backState={data.results}
          movieGunres={movieGunres}
          seriesGenres={seriesGenres}
          topRatedMovies={topRatedMovies}
        />
        <div className="flex flex-col bg-[#27272A] absolute z-100 bottom-0 justify-center items-center bg-opacity-50  w-full h-full">
          {error ? (
            <div className="errorExist">
              <p>{error}</p>
            </div>
          ) : (
            ""
          )}
          <div className="bg-black p-16 rounded-lg">
            <h1 className="text-center">Register</h1>
            <form onSubmit={formik.handleSubmit}>
              <Input formik={formik} name="name" type="text" label="UserName" />
              <Input formik={formik} name="email" type="text" label="Email" />
              <Input
                formik={formik}
                name="phoneNumber"
                type="text"
                label="PhoneNumber"
              />
              <Input
                formik={formik}
                name="password"
                type="password"
                label="Password"
              />
              <Input
                formik={formik}
                name="passwordConfrim"
                type="password"
                label="PasswordConfirm"
              />
              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

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
