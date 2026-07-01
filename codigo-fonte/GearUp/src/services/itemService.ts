import type { Item } from "../types/item.ts";

const API = "http://localhost:3001/items";

// Buscar todos os itens
export async function getItems(): Promise<Item[]> {
  const response = await fetch(API);

  if (!response.ok) {
    throw new Error("Erro ao buscar itens");
  }

  return response.json();
}

// Buscar um item por ID
export async function getItemById(id: number): Promise<Item> {
  const response = await fetch(`${API}/${id}`);

  if (!response.ok) {
    throw new Error("Item não encontrado");
  }

  return response.json();
}

// Criar um item
export async function createItem(item: Omit<Item, "id">): Promise<Item> {
  const response = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar item");
  }

  return response.json();
}

// Atualizar um item inteiro
export async function updateItem(id: number, item: Item): Promise<Item> {
  const response = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar item");
  }

  return response.json();
}

// Atualizar apenas alguns campos
export async function patchItem(
  id: number,
  dados: Partial<Item>,
): Promise<Item> {
  const response = await fetch(`${API}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar item");
  }

  return response.json();
}

// Excluir um item
export async function deleteItem(id: number): Promise<void> {
  const response = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Erro ao excluir item");
  }
}
