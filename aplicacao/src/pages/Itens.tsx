import { useEffect, useState } from "preact/hooks";
import { route } from "preact-router";
import type { RoutableProps } from "preact-router";

import usuario from "../assets/images/iconeusuario.jpg";
import logo from "../assets/svgs/logo.svg";

import CardItens from "../components/CardItens";
import { deleteItem, getItems } from "../services/itemService";
import type { Item } from "../types/item";
import { imagemPadrao } from "../utils/imagemPadrao";

import "../styles/itens.css";
import "../styles/utility.css";

const Itens = (_props: RoutableProps) => {
  const [itens, setItens] = useState<Item[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    getItems()
      .then((dados) => setItens(dados))
      .catch((error) => {
        console.error(error);
        alert("Não foi possível carregar os anúncios.");
      })
      .finally(() => setCarregando(false));
  }, []);

  const handleDelete = async (id: string) => {
    const confirmar = globalThis.confirm(
      "Tem certeza de que deseja remover este anúncio?",
    );

    if (!confirmar) {
      return;
    }

    try {
      await deleteItem(id);
      setItens((itensAtuais) =>
        itensAtuais.filter((item) => item.id !== id),
      );
      alert("Anúncio removido com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Não foi possível remover o anúncio.");
    }
  };

  return (
    <>
      <header>
        <span className="logo">
          <img src={logo} alt="logo da gearUp" width={180} height={50} />
        </span>

        <div className="perfil-usuario">
          <p>Bruno</p>

          <img src={usuario} alt="icone usuario" width={50} height={50} />
        </div>
      </header>

      <main className="container2">
        <div className="title-itens">
          <h1>Meus Anúncios</h1>

          <button type="button" onClick={() => route("/anuncio/novo")}>
            Novo Anúncio +
          </button>
        </div>

        <section className="cards-grid">
          {carregando ? (
            <p>Carregando anúncios...</p>
          ) : itens.length > 0 ? (
            itens.map((item) => (
              <CardItens
                key={item.id}
                imagem={item.imagem || imagemPadrao(item.titulo)}
                titulo={item.titulo}
                valor={item.valorDia}
                onEdit={() => route(`/anuncio/editar/${item.id}`)}
                onDelete={() => handleDelete(item.id)}
              />
            ))
          ) : (
            <p>Nenhum anúncio cadastrado.</p>
          )}
        </section>
      </main>
    </>
  );
};
export default Itens;
