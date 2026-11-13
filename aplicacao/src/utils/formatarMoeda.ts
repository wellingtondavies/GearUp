const formatador = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

/** 60 → "R$ 60,00"; 49.9 → "R$ 49,90". */
export function formatarMoeda(valor: number): string {
  return formatador.format(valor);
}
