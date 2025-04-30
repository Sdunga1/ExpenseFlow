import React, { useEffect } from "react";
import { FaTrash, FaEdit, FaChevronDown } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";
import {
  deleteCategoryAPI,
  listCategoriesAPI,
} from "../../services/category/categoryServices";
import AlertMessage from "../../Alert/AlertMessage";

const CategoriesList = () => {
  const { state } = useLocation();
  const updatedId = state?.updatedId;

  //fetching
  const {
    data = [],
    isError,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["list-categories"],
    queryFn: listCategoriesAPI,
  });

  //Delete
  //Mutation
  const {
    mutateAsync,
    error: deleteError,
    isSuccess: deleteSuccess,
    reset,
  } = useMutation({
    mutationFn: deleteCategoryAPI,
    mutationKey: ["delete-category"],
    onSuccess: () => refetch(),
  });

  //Delete handler
  const handleDelete = (id) => {
    mutateAsync(id)
      .then((data) => {
        console.log(data);
      })
      .catch((e) => console.log(e));
  };

  //Automatically clear the alert message after 500 milliseconds
  useEffect(() => {
    let timer;
    if (deleteSuccess || deleteError) {
      timer = setTimeout(() => {
        reset();
      }, 500);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [deleteError, deleteSuccess, reset]);

  useEffect(() => {
    if (updatedId) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [updatedId]);

  const showScrollIcon = (data?.length ?? 0) > 7;

  return (
    <div className="max-w-md mx-auto my-10 bg-white p-6 rounded-lg shadow-2xl space-y-6 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Categories</h2>
      {/* Display message */}
      {isLoading && <AlertMessage type="loading" message="Loading..." />}
      {isError && (
        <AlertMessage type="error" message={error.response.data.message} />
      )}

      {deleteSuccess && (
        <div className="relative">
          <AlertMessage
            type="success"
            message="Category deleted successfully!"
          />
          <div className="progress-bar" />
        </div>
      )}
      {deleteError && (
        <AlertMessage
          type="error"
          message={deleteError.response?.data?.message || "Delete failed"}
        />
      )}
      <div className="relative">
        <ul
          className={`space-y-4 ${
            showScrollIcon ? "max-h-80 overflow-y-auto pr-2" : ""
          }`}
        >
          {data.map((category) => (
            <li
              key={category._id}
              className={`flex justify-between items-center bg-gray-100 p-3 rounded-md ${
                category._id === updatedId ? "bump" : ""
              }`}
            >
              <div>
                <span className="text-gray-800">{category.name}</span>
                <span
                  className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    category.type === "income"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {category.type.charAt(0).toUpperCase() +
                    category.type.slice(1)}
                </span>
              </div>
              <div className="flex space-x-3">
                <Link to={`/update-category/${category._id}`}>
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(category?._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>

        {showScrollIcon && (
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 animate-bounce">
            <FaChevronDown className="text-gray-400" />
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesList;
