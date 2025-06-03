import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/slice/authSlice";

export default function PrivateNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutAction());
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <Disclosure as="nav" className="bg-emerald-50 shadow rounded-sm">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              <div className="flex items-center relative">
                <FaHandHoldingDollar className="h-8 w-auto text-green-500" />
                <Link
                  to="/"
                  className="ml-3 text-lg font-semibold text-gray-900 relative flex items-center"
                >
                  <span className="text-gray-500 text-2xl font-serif italic">
                    E
                  </span>
                  <span className="text-gray-500 font-medium">xpense</span>
                  <span className="text-2xl font-bold ml-1 bg-gradient-to-r from-yellow-500 via-orange-400 to-red-400 bg-clip-text text-transparent">
                    FLOW
                  </span>
                  <span className="absolute left-0 -bottom-4 w-full h-1 bg-yellow-400" />
                </Link>
              </div>
              <div className="hidden md:flex md:space-x-8">
                <Link
                  to="/add-transaction"
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  Add Transaction
                </Link>
                <Link
                  to="/add-category"
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  Add Category
                </Link>
                <Link
                  to="/categories"
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  Categories
                </Link>
                <Link
                  to="/profile"
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  Profile
                </Link>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  Dashboard
                </Link>
              </div>
              <button
                onClick={logoutHandler}
                className="ml-2 inline-flex items-center gap-x-1.5 rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600"
              >
                <IoLogOutOutline className="h-5 w-5" />
                Logout
              </button>
              <div className="md:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 pb-3 pt-2">
              <Link to="/">
                <Disclosure.Button
                  as="button"
                  className="block w-full text-left border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                >
                  ExpenseFLOW
                </Disclosure.Button>
              </Link>
              <Link to="/add-transaction">
                <Disclosure.Button
                  as="button"
                  className="block w-full text-left border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                >
                  Add Transaction
                </Disclosure.Button>
              </Link>
              <Link to="/add-category">
                <Disclosure.Button
                  as="button"
                  className="block w-full text-left border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                >
                  Add Category
                </Disclosure.Button>
              </Link>
              <Link to="/categories">
                <Disclosure.Button
                  as="button"
                  className="block w-full text-left border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                >
                  Categories
                </Disclosure.Button>
              </Link>
              <Link to="/profile">
                <Disclosure.Button
                  as="button"
                  className="block w-full text-left border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                >
                  Profile
                </Disclosure.Button>
              </Link>
              <Link to="/dashboard">
                <Disclosure.Button
                  as="button"
                  className="block w-full text-left border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                >
                  Dashboard
                </Disclosure.Button>
              </Link>
            </div>
            <div className="border-t border-gray-200 pb-3 pt-4">
              <Disclosure.Button
                as="button"
                onClick={logoutHandler}
                className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
              >
                Sign out
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
