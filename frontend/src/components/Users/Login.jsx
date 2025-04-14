import React, { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import robotGif from "../../assets/robot.gif";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { loginAPI } from "../../services/users/userServices";
import AlertMessage from "../../Alert/AlertMessage";
import { Link } from "react-router-dom";
import { loginAction } from "../../redux/slice/authSlice";

//Validations
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid").required("Email is required"),
  password: Yup.string()
    .min(4, "password must be at least 4 characters long")
    .required("Password is required"),
});

const LoginForm = () => {
  //Dispatch
  const dispatch = useDispatch();

  //Show or hide password
  const [showPassword, setShowPassword] = useState(false);

  //Mutation
  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: loginAPI,
    mutationKey: ["login"],
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    //Validations
    validationSchema,

    //Submit
    onSubmit: (values) => {
      console.log(values);
      //http request
      mutateAsync(values)
        .then((data) => {
          //dispatch
          dispatch(loginAction(data));
          //Save the user into localstorage
          localStorage.setItem('userInfo', JSON.stringify(data));
        })
        .catch((e) => console.log(e));
    },
  });
  //   console.log({isPending, isError, error, isSuccess});

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-md mx-auto my-10 bg-emerald-50 p-6 rounded-xl shadow-lg space-y-6 border border-gray-300"
    >
      <h2 className="text-3xl font-semibold text-center text-gray-800">
        Login
      </h2>
      {/*Display error messages */}
      {isPending && <AlertMessage type="loading" message="Logging you in..." />}
      {isError && (
        <AlertMessage type="error" message={error.response.data.message} />
      )}
      {isSuccess && (
        <AlertMessage type="success" message="Login successful!!" />
      )}
      <p className="text-sm text-center text-gray-500">
        Sign in to access your account
      </p>
      <div className="flex justify-center">
        <div className="w-24 h-24 bg-[#4a4a66] rounded-full flex items-center justify-center shadow-lg">
          <img
            src={robotGif}
            alt="Robot Animation"
            className="w-30 h-30 rounded-full"
          />
        </div>
      </div>
      <div className="relative">
        <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
        <input
          id="email"
          type="email"
          {...formik.getFieldProps("email")}
          placeholder="Email"
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        {formik.touched.email && formik.errors.email && (
          <span className="text-xs text-red-500">{formik.errors.email}</span>
        )}
      </div>
      <div className="relative">
        <FaLock className="absolute top-3 left-3 text-gray-400" />
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          {...formik.getFieldProps("password")}
          placeholder="Password"
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        {/* Password visibility hidden or show */}
        <button
          type="button"
          onClick={() => {
            setShowPassword(!showPassword);
          }}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>

        {formik.touched.password && formik.errors.password && (
          <span className="text-xs text-red-500">{formik.errors.password}</span>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-teal-600 text-white font-bold py-2 px-4 rounded-md transition duration-150 ease-in-out"
      >
        Login
      </button>

      <div className="flex justify-center">
        <Link
          to="/"
          className="text-center hover:text-green-500 text-red-800 font-sm mr-1.5"
        >
          Home
        </Link>
        <p className="text-gray-600">/</p>
        <Link
          to="/register"
          className="text-center hover:text-green-500 text-red-800 font-sm ml-1.5"
        >
          Register
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
