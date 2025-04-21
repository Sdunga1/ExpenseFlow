import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginForm from "./components/Users/Login";
import PrivateNavbar from "./components/Users/PrivateNavbar";
import { useSelector } from "react-redux";
import RegisterForm from "./components/Users/Register";

function App() {
  //Get the token
  const user = useSelector((state) => state?.auth?.user);
  console.log(user);

  return (
    <BrowserRouter>
      {user ? <PrivateNavbar /> : <></>}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/register" element={<RegisterForm />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
