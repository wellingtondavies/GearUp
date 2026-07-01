import caixasfundo4 from "../assets/images/caixasfundo4.jpg";
import { route } from "preact-router";
import type { RoutableProps } from "preact-router";
import "../styles/home.css";
import "../styles/utility.css";
import logo from "../assets/svgs/logo.svg";

const Login = (props: RoutableProps) => {
  return (
    <main className="sing-in">
      <section className="content">
        <div className="information">
          <div class="title">
            <h1>Entre na sua conta</h1>
            <p>Entre para anunciar ou alugar itens de forma rápida e segura.</p>
          </div>

          <form>
            <input type="text" placeholder="Nome" />

            <input type="email" placeholder="Seu e-mail" />

            <input type="password" placeholder="Senha" />
          </form>

          <div>
            <button className="criarConta" onClick={() => route("/Itens")}>
              Entrar
            </button>
            <p className="login-text">
              Não tem uma conta?{" "}
              <button
                type="button"
                className="login"
                onClick={() => route("/")}
              >
                Registre-se
              </button>
            </p>
          </div>
        </div>
      </section>

      <section className="image">
        <img src={caixasfundo4} alt="" />
      </section>
    </main>
  );
};
export default Login;
