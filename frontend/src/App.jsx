import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginForm from "./components/Users/Login";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import { useSelector } from "react-redux";
import RegisterForm from "./components/Users/Register";
import AddCategory from "./components/Category/AddCategory";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import CategoriesList from "./components/Category/CategoriesList";
import UpdateCategory from "./components/Category/UpdateCategory";
import TransactionForm from "./components/Transactions/TransactionForm";
import Dashboard from "./components/Users/Dashboard";

function App() {
  //Get the token
  const user = useSelector((state) => state?.auth?.user);
  console.log(user);

  return (
    <BrowserRouter>
      {user ? <PrivateNavbar /> : <PublicNavbar />}
      <Routes>
        <Route
          path="/"
          element={<Navigate to={user ? "/profile" : "/login"} replace />}
        ></Route>
        <Route path="/" element={<Navigate to="/login" replace />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/register" element={<RegisterForm />}></Route>
        <Route path="/add-category" element={<AddCategory />}></Route>
        <Route path="/categories" element={<CategoriesList />}></Route>
        <Route path="/update-category/:id" element={<UpdateCategory />}></Route>
        <Route path="/add-transaction" element={<TransactionForm />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
