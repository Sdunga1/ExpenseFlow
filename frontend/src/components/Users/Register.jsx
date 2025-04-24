import React, { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEyeSlash, FaEye } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { registerAPI } from "../../services/users/userServices";
import AlertMessage from "../../Alert/AlertMessage";
import { Link, useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(4, "At least 4 characters")
    .required("Password is required"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm your password"),
});

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Navigate
  const navigate = useNavigate();

  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: registerAPI,
    mutationKey: ["register"],
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema,
    //Submit
    onSubmit: (values) => {
      console.log(values);
      //http request
      mutateAsync(values)
        .then((data) => {
          console.log(data);
        })
        .catch((e) => console.log(e));
    },
  });

  console.log(formik);

  //Redirect to login
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isSuccess) {
        navigate("/login");
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [isSuccess, navigate]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-md mx-auto my-10 bg-emerald-50 p-6 rounded-xl shadow-lg space-y-6 border border-gray-300"
    >
      <h2 className="text-3xl font-semibold text-center text-gray-800">
        Register
      </h2>
      {isPending && <AlertMessage type="loading" message="Registering..." />}
      {isError && (
        <AlertMessage
          type="error"
          message={error.response.data.message || "Registration failed"}
        />
      )}
      {isSuccess && (
        <AlertMessage type="success" message="Registration successful!" />
      )}
      <div className="relative">
        <FaUser className="absolute top-3 left-3 text-gray-400" />
        <input
          id="username"
          type="text"
          placeholder="Username"
          {...formik.getFieldProps("username")}
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        {formik.touched.username && formik.errors.username && (
          <span className="text-xs text-red-500">{formik.errors.username}</span>
        )}
      </div>
      <div className="relative">
        <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
        <input
          id="email"
          type="email"
          placeholder="Email"
          {...formik.getFieldProps("email")}
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
          placeholder="Password"
          {...formik.getFieldProps("password")}
          className="pl-10 pr-10 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        {/* toggle button */}
        <button
          type="button"
          onClick={() => setShowPassword((s) => !s)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>

        {formik.touched.password && formik.errors.password && (
          <span className="text-xs text-red-500">{formik.errors.password}</span>
        )}
      </div>

      {/* --- CONFIRM PASSWORD FIELD WITH ITS OWN TOGGLE --- */}
      <div className="relative">
        <FaLock className="absolute top-3 left-3 text-gray-400" />
        <input
          id="confirmpassword"
          type={showConfirm ? "text" : "password"}
          placeholder="Confirm Password"
          {...formik.getFieldProps("confirmpassword")}
          className="pl-10 pr-10 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={() => setShowConfirm((s) => !s)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          {showConfirm ? <FaEyeSlash /> : <FaEye />}
        </button>

        {formik.touched.confirmpassword && formik.errors.confirmpassword && (
          <span className="text-xs text-red-500">
            {formik.errors.confirmpassword}
          </span>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-teal-600 text-white font-bold py-2 px-4 rounded-md transition duration-150 ease-in-out"
      >
        Register
      </button>
      <div className="flex justify-center">
        <Link
          to="/login"
          className="text-center hover:text-green-500 text-red-800 font-sm ml-1.5"
        >
          Login
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
