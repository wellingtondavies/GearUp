import { useEffect, useState } from "preact/hooks";
import { route } from "preact-router";
import type { RoutableProps } from "preact-router";
import { getItemById, updateItem, deleteItem } from "../services/itemService";
import type { Item } from "../types/item";
import "../styles/edit-item.css";
import "../styles/utility.css";

interface EditItemProps extends RoutableProps {
  id?: string;
}
export default function EditItem(props: Readonly<EditItemProps>) {
  console.log("O ID que o Preact Router leu da URL é:", props.id);

  const [itemCompleto, setItemCompleto] = useState<Item | null>(null);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valorDia, setValorDia] = useState("");
  const [imagem, setImagem] = useState("");
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    if (props.id) {
      getItemById(props.id)
        .then((dadosDoItem) => {
          setItemCompleto(dadosDoItem);
          setTitulo(dadosDoItem.titulo);
          setDescricao(dadosDoItem.descricao);
          setValorDia(String(dadosDoItem.valorDia));
          setImagem(dadosDoItem.imagem || "");
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          alert("Erro ao carregar dados do anúncio.");
          globalThis.history.back();
        });
    }
  }, [props.id]);

  const handleSalvar = async (e: Event) => {
    e.preventDefault();
    if (!props.id || !itemCompleto) return;

    try {
      const itemAtualizado: Item = {
        ...itemCompleto,
        titulo,
        descricao,
        valorDia: Number(valorDia),
        imagem: imagem || undefined,
      };

      await updateItem(props.id, itemAtualizado);

      alert("Alterações salvas com sucesso!");
      route("/");
    } catch (error) {
      console.error(error);
      alert("Não foi possível atualizar o anúncio.");
    }
  };

  const handleExcluir = async () => {
    if (!props.id) return;

    const confirmar = globalThis.confirm(
      "Tem certeza de que deseja deletar permanentemente este anúncio?",
    );
    if (confirmar) {
      try {
        await deleteItem(props.id);
        alert("Anúncio removido com sucesso!");
        route("/");
      } catch (error) {
        console.error(error);
        alert("Erro ao tentar excluir.");
      }
    }
  };
  if (loading) {
    return (
      <div className="loading-screen">
        <p>Carregando dados do anúncio...</p>
      </div>
    );
  }

  return (
    <main className="edit-item-container">
      <header className="edit-item-header">
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
        <h1>Editar Anúncio</h1>
      </header>

      <section className="form-content">
        <form onSubmit={handleSalvar}>
          <div className="upload-photo-container">
            <input
              type="file"
              id="edit-file-upload"
              accept="image/*"
              className="sr-only"
              onChange={handleImageChange}
            />
            <label
              htmlFor="edit-file-upload"
              className="upload-box-edit"
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
                    alt="Foto do anúncio"
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
                    Trocar Imagem
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
                  <h2>Sem foto anexada</h2>
                  <p>Clique para adicionar uma imagem do PC</p>
                </>
              )}
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="nome-item">Nome do Item</label>
            <input
              id="nome-item"
              type="text"
              value={titulo}
              onInput={(e) => setTitulo((e.target as HTMLInputElement).value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="desc-item">Descrição</label>
            <textarea
              id="desc-item"
              rows={4}
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
              value={valorDia}
              onInput={(e) => setValorDia((e.target as HTMLInputElement).value)}
            />
          </div>

          <div className="actions-group">
            <button type="submit" className="btn-save">
              Salvar Alterações
            </button>
            <button
              type="button"
              onClick={handleExcluir}
              className="btn-delete"
            >
              Excluir Anúncio
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
