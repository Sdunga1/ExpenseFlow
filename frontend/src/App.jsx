import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./components/Users/Login";
import PrivateNavbar from "./components/Users/PrivateNavbar";
import { useSelector } from "react-redux";

function App() {
  //Get the token
  const user = useSelector((state) => state?.auth?.user);
  console.log(user);

  return (
    <BrowserRouter>
      {user ? <PrivateNavbar /> : <></>}
      <Routes>
        <Route path="/" element={<LoginForm />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
