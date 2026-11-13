/** Lê o arquivo escolhido no input e devolve a imagem em data URL (base64). */
export function lerImagemComoDataUrl(arquivo: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(arquivo);
  });
}
