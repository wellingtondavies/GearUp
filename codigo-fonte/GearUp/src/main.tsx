import { render } from "preact";
import { Router } from "preact-router";
import "./styles/index.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Itens from "./pages/Itens";
import AddItem from "./pages/AddItem";
import EditItem from "./pages/EditItem";

render(
  <Router>
    <Home path="/" />
    <Login path="/login" />
    <Itens path="/Itens" />
    <AddItem path="/anuncio/novo" />
    <EditItem path="/anuncio/editar/:id" />
  </Router>,
  document.getElementById("root")!,
);
