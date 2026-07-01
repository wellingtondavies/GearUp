import { render } from "preact";
import { Router } from "preact-router";
import "./styles/index.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Itens from "./pages/Itens";

render(
  <Router>
    <Home path="/" />
    <Login path="/login" />
    <Itens path="/Itens"/>
  </Router>,
  document.getElementById("root")!,
);
