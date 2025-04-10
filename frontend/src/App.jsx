import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./components/Users/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
