import { FaHandHoldingDollar } from "react-icons/fa6";
import { RiLoginCircleLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function PublicNavbar() {
  return (
    <nav className="rounded-sm bg-emerald-50 shadow">
      <div className="mx-auto max-w-10xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Logo and Name with Full-Height Border */}
          <div className="flex items-center relative">
            <FaHandHoldingDollar className="h-10 w-auto text-green-500" />
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

          {/* Register and Login Buttons */}
          <div className="flex items-center">
            <Link
              to="/register"
              className="inline-flex items-center gap-x-1.5 rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600"
            >
              <FaRegUser className="h-5 w-5" aria-hidden="true" />
              Register
            </Link>
            <Link
              to="/login"
              className="ml-2 inline-flex items-center gap-x-1.5 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 animate-bounce"
            >
              <RiLoginCircleLine className="h-5 w-5" aria-hidden="true" />
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
