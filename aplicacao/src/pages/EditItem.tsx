import { useEffect, useState } from "preact/hooks";
import { route } from "preact-router";
import type { RoutableProps } from "preact-router";
import BackButton from "../components/BackButton";
import ImageUpload from "../components/ImageUpload";
import { getItemById, updateItem, deleteItem } from "../services/itemService";
import type { Item } from "../types/item";
import "../styles/add-item.css";
import "../styles/edit-item.css";
import "../styles/utility.css";

interface EditItemProps extends RoutableProps {
  id?: string;
}

export default function EditItem({ id }: Readonly<EditItemProps>) {
  const [itemCompleto, setItemCompleto] = useState<Item | null>(null);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valorDia, setValorDia] = useState("");
  const [imagem, setImagem] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (!id) return;

    getItemById(id)
      .then((item) => {
        setItemCompleto(item);
        setTitulo(item.titulo);
        setDescricao(item.descricao);
        setValorDia(String(item.valorDia));
        setImagem(item.imagem ?? "");
        setCarregando(false);
      })
      .catch((error) => {
        console.error(error);
        alert("Erro ao carregar dados do anúncio.");
        globalThis.history.back();
      });
  }, [id]);

  const handleSalvar = async (e: Event) => {
    e.preventDefault();
    if (!id || !itemCompleto) return;

    const valor = Number(valorDia);
    if (!titulo.trim() || !descricao.trim() || !Number.isFinite(valor) || valor <= 0) {
      alert("Preencha nome, descrição e um valor por dia maior que zero.");
      return;
    }

    setSalvando(true);
    try {
      await updateItem(id, {
        ...itemCompleto,
        titulo: titulo.trim(),
        descricao: descricao.trim(),
        valorDia: valor,
        imagem: imagem || undefined,
      });

      alert("Alterações salvas com sucesso!");
      route("/itens");
    } catch (error) {
      console.error(error);
      alert("Não foi possível atualizar o anúncio.");
    } finally {
      setSalvando(false);
    }
  };

  const handleExcluir = async () => {
    if (!id) return;

    const confirmar = globalThis.confirm(
      "Tem certeza de que deseja deletar permanentemente este anúncio?",
    );
    if (!confirmar) return;

    try {
      await deleteItem(id);
      alert("Anúncio removido com sucesso!");
      route("/itens");
    } catch (error) {
      console.error(error);
      alert("Erro ao tentar excluir.");
    }
  };

  if (carregando) {
    return (
      <div className="loading-screen">
        <p>Carregando dados do anúncio...</p>
      </div>
    );
  }

  return (
    <main className="edit-item-container">
      <header className="edit-item-header">
        <BackButton />
        <h1>Editar Anúncio</h1>
      </header>

      <section className="form-content">
        <form onSubmit={handleSalvar}>
          <ImageUpload
            id="edit-file-upload"
            className="upload-box-edit"
            imagem={imagem}
            onChange={setImagem}
            tituloVazio="Sem foto anexada"
            textoVazio="Clique para adicionar uma imagem do PC"
            textoTrocar="Trocar Imagem"
          />

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
              min="0.01"
              step="0.01"
              value={valorDia}
              onInput={(e) => setValorDia((e.target as HTMLInputElement).value)}
            />
          </div>

          <div className="actions-group">
            <button type="submit" className="btn-save" disabled={salvando}>
              {salvando ? "Salvando..." : "Salvar Alterações"}
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
