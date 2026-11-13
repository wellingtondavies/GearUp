import { lerImagemComoDataUrl } from "../utils/lerImagem";
import "../styles/image-upload.css";

interface ImageUploadProps {
  id: string;
  /** Imagem atual em data URL, ou string vazia se não houver. */
  imagem: string;
  onChange: (imagem: string) => void;
  /** Classe da caixa tracejada (o estilo muda entre as telas de cadastro e edição). */
  className: string;
  tituloVazio: string;
  textoVazio: string;
  textoTrocar: string;
}

/** Campo de foto com pré-visualização, compartilhado pelas telas de cadastro e edição. */
export default function ImageUpload({
  id,
  imagem,
  onChange,
  className,
  tituloVazio,
  textoVazio,
  textoTrocar,
}: ImageUploadProps) {
  const handleChange = async (e: Event) => {
    const arquivo = (e.target as HTMLInputElement).files?.[0];
    if (!arquivo) return;

    try {
      onChange(await lerImagemComoDataUrl(arquivo));
    } catch (error) {
      console.error(error);
      alert("Não foi possível ler a imagem selecionada.");
    }
  };

  return (
    <div className="upload-photo-container">
      <input
        type="file"
        id={id}
        accept="image/*"
        className="sr-only"
        onChange={handleChange}
      />
      <label
        htmlFor={id}
        className={`${className}${imagem ? " upload-box--com-imagem" : ""}`}
      >
        {imagem ? (
          <div className="upload-preview">
            <img src={imagem} alt="Pré-visualização da foto do anúncio" />
            <span className="upload-preview-label">{textoTrocar}</span>
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
            <h2>{tituloVazio}</h2>
            <p>{textoVazio}</p>
          </>
        )}
      </label>
    </div>
  );
}
