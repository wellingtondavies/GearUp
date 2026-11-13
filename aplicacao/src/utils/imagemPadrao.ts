import caixasImg from "../assets/images/caixas.png";
import parafusadeiraImg from "../assets/images/parafusadeira.jpg";
import parafusadeira2Img from "../assets/images/parafusadeira2.jpg";

/** Imagem usada quando o anúncio não tem foto, escolhida pelo título. */
export function imagemPadrao(titulo: string): string {
  const tituloNormalizado = titulo.trim().toLowerCase();

  if (tituloNormalizado.includes("parafusadeira")) return parafusadeira2Img;
  if (tituloNormalizado.includes("caixa")) return caixasImg;
  return parafusadeiraImg;
}
