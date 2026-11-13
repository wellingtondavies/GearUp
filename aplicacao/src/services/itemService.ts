import { API_URL } from "../config";
import type { Item, NovoItem } from "../types/item";

const ITEMS_URL = `${API_URL}/items`;

/** Faz a requisição e converte a resposta; lança erro com a mensagem dada se o status não for 2xx. */
async function request<T>(
  url: string,
  mensagemDeErro: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });

  if (!response.ok) {
    throw new Error(`${mensagemDeErro} (HTTP ${response.status})`);
  }

  // DELETE responde sem corpo em algumas versões do JSON Server.
  const texto = await response.text();
  return (texto ? JSON.parse(texto) : undefined) as T;
}

const urlDoItem = (id: string) => `${ITEMS_URL}/${encodeURIComponent(id.trim())}`;

export function getItems(): Promise<Item[]> {
  return request<Item[]>(ITEMS_URL, "Erro ao buscar itens");
}

export function getItemById(id: string): Promise<Item> {
  return request<Item>(urlDoItem(id), "Item não encontrado");
}

export function createItem(item: NovoItem): Promise<Item> {
  return request<Item>(ITEMS_URL, "Erro ao criar item", {
    method: "POST",
    body: JSON.stringify(item),
  });
}

export function updateItem(id: string, item: Item): Promise<Item> {
  return request<Item>(urlDoItem(id), "Erro ao atualizar item", {
    method: "PUT",
    body: JSON.stringify(item),
  });
}

export function patchItem(id: string, dados: Partial<NovoItem>): Promise<Item> {
  return request<Item>(urlDoItem(id), "Erro ao atualizar item", {
    method: "PATCH",
    body: JSON.stringify(dados),
  });
}

export async function deleteItem(id: string): Promise<void> {
  await request<unknown>(urlDoItem(id), "Erro ao excluir item", {
    method: "DELETE",
  });
}
