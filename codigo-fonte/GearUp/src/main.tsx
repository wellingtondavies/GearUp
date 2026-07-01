import { render } from "preact";
import { Router } from "preact-router";
import "./styles/index.css";
import Home from "./pages/Home";
import Login from "./pages/Login";

render(
  <Router>
    <Home path="/" />
    <Login path="/login" />
  </Router>,
  document.getElementById("root")!,
);
