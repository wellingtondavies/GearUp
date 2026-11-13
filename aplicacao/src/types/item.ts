export interface Item {
  id: string;
  titulo: string;
  descricao: string;
  valorDia: number;
  disponivel: boolean;
  categoria?: string;
  cidade?: string;
  /** Imagem em data URL (base64), gerada no upload. */
  imagem?: string;
}

/** Dados enviados ao criar um anúncio: o id é gerado pela API. */
export type NovoItem = Omit<Item, "id">;
