import * as yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import Input from "../common/Input";
import { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import {
  HomeIcon,
  SearchIcon,
  LoginIcon,
  UserIcon,
  XIcon,
} from "@heroicons/react/outline";

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

const Signup = ({ setLogin }) => {
  const [error, setError] = useState(null);

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
        <div className="flex flex-col mt-[100px] justify-center items-center">
          {error ? (
            <div className="errorExist">
              <p>{error}</p>
            </div>
          ) : (
            ""
          )}
          <div className="bg-[#171717] p-16 rounded-lg relative">
            <div onClick={() => setLogin(false)}>
              <XIcon
                width={25}
                height={25}
                className="absolute bg-[#DC2626] right-0 top-0 mr-5 mt-5 rounded-[50%] cursor-pointer"
              />
            </div>
            <p
              className="text-center text-[25px]"
              style={{ fontFamily: "Sofia,cursive" }}
            >
              Login
            </p>
            <form onSubmit={formik.handleSubmit}>
              <Input formik={formik} name="email" type="text" label="Email" />

              <Input
                formik={formik}
                name="password"
                type="password"
                label="Password"
              />
              <button
                type="submit"
                className="mt-4 w-full bg-[#FB923C] rounded-lg"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
