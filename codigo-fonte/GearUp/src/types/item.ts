export interface Item {
  id: string;
  titulo: string;
  descricao: string;
  categoria: string;
  valorDia: number;
  cidade: string;
  disponivel: boolean;
  imagem?: string;
}
