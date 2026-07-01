import { useState } from "preact/hooks";
import { route } from "preact-router";
import type { RoutableProps } from "preact-router";
import { createItem } from "../services/itemService";
import "../styles/add-item.css";
import "../styles/utility.css";

const AddItem = (props: RoutableProps) => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valorDia, setValorDia] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagem, setImagem] = useState("");
  const handleImageChange = (e: Event) => {
    const target = e.target as HTMLInputElement;

    if (target.files?.[0]) {
      const file = target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagem(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (!titulo || !descricao || !valorDia) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    try {
      setLoading(false);
      await createItem({
        titulo,
        descricao,
        valorDia: Number(valorDia),
        categoria: "Geral",
        cidade: "Não informada",
        disponivel: true,
      });

      alert("Item anunciado com sucesso!");
      route("/");
    } catch (error) {
      console.error(error);
      alert("Houve um erro ao tentar criar o anúncio.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="add-item-container">
      <header className="add-item-header">
        <button className="back-btn" onClick={() => globalThis.history.back()}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <h1>Adicionar Item</h1>
      </header>

      <section className="form-content">
        <form onSubmit={handleSubmit}>
          <div className="upload-photo-container">
            <input
              type="file"
              id="file-upload"
              accept="image/*"
              className="sr-only"
              onChange={handleImageChange}
            />
            <label
              htmlFor="file-upload"
              className="upload-box"
              style={
                imagem
                  ? { padding: "0", overflow: "hidden", border: "none" }
                  : {}
              }
            >
              {imagem ? (
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "200px",
                  }}
                >
                  <img
                    src={imagem}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      right: "10px",
                      background: "rgba(0,0,0,0.6)",
                      color: "white",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "0.75rem",
                    }}
                  >
                    Alterar Foto
                  </div>
                </div>
              ) : (
                <>
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="upload-icon"
                  >
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                    <circle cx="12" cy="13" r="4"></circle>
                  </svg>
                  <h2>Incluir Foto</h2>
                  <p>Clique para selecionar do seu PC</p>
                </>
              )}
            </label>
          </div>

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
              placeholder="50"
              value={valorDia}
              onInput={(e) => setValorDia((e.target as HTMLInputElement).value)}
            />
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Salvando..." : "Adicionar"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default AddItem;
