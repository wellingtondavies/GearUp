import { useState } from "preact/hooks";
import { route } from "preact-router";
import type { RoutableProps } from "preact-router";
import BackButton from "../components/BackButton";
import ImageUpload from "../components/ImageUpload";
import { createItem } from "../services/itemService";
import "../styles/add-item.css";
import "../styles/utility.css";

const AddItem = (_props: RoutableProps) => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valorDia, setValorDia] = useState("");
  const [imagem, setImagem] = useState("");
  const [salvando, setSalvando] = useState(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    const valor = Number(valorDia);
    if (!titulo.trim() || !descricao.trim() || !valorDia) {
      alert("Por favor, preencha todos os campos!");
      return;
    }
    if (!Number.isFinite(valor) || valor <= 0) {
      alert("O valor por dia deve ser maior que zero.");
      return;
    }

    setSalvando(true);
    try {
      await createItem({
        titulo: titulo.trim(),
        descricao: descricao.trim(),
        valorDia: valor,
        disponivel: true,
        imagem: imagem || undefined,
      });

      alert("Item anunciado com sucesso!");
      route("/itens");
    } catch (error) {
      console.error(error);
      alert("Houve um erro ao tentar criar o anúncio.");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <main className="add-item-container">
      <header className="add-item-header">
        <BackButton />
        <h1>Adicionar Item</h1>
      </header>

      <section className="form-content">
        <form onSubmit={handleSubmit}>
          <ImageUpload
            id="file-upload"
            className="upload-box"
            imagem={imagem}
            onChange={setImagem}
            tituloVazio="Incluir Foto"
            textoVazio="Clique para selecionar do seu PC"
            textoTrocar="Alterar Foto"
          />

          <div className="form-group">
            <label htmlFor="nome-item">Nome do Item</label>
            <input
              id="nome-item"
              type="text"
              placeholder="Ex: Poltrona"
              value={titulo}
              onInput={(e) => setTitulo((e.target as HTMLInputElement).value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="descricao-item">Descrição do Item</label>
            <textarea
              id="descricao-item"
              rows={4}
              placeholder="Descreva detalhes importantes do item..."
              value={descricao}
              onInput={(e) =>
                setDescricao((e.target as HTMLTextAreaElement).value)
              }
            />
          </div>

          <div className="form-group short-input">
            <label htmlFor="valor-dia">Valor por Dia (R$)</label>
            <input
              id="valor-dia"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="50"
              value={valorDia}
              onInput={(e) => setValorDia((e.target as HTMLInputElement).value)}
            />
          </div>

          <button type="submit" className="btn-submit" disabled={salvando}>
            {salvando ? "Salvando..." : "Adicionar"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default AddItem;
