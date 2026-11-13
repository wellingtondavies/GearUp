/** Botão de voltar usado no topo das telas de formulário. */
export default function BackButton() {
  return (
    <button
      type="button"
      className="back-btn"
      aria-label="Voltar"
      onClick={() => globalThis.history.back()}
    >
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
  );
}
