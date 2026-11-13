import { formatarMoeda } from "../utils/formatarMoeda";
import "../styles/cardItens.css";

interface CardItensProps {
    imagem: string;
    titulo: string;
    valor: number;
    onEdit?: () => void;
    onDelete?: () => void;
}

export default function CardItens({
    imagem,
    titulo,
    valor,
    onEdit,
    onDelete,
}: CardItensProps) {
    return (
        <div className="card">
            <img src={imagem} alt={titulo} />
            <div className="card-information">
                <h2>{titulo}</h2>
                <span>
                    <p>{formatarMoeda(valor)}</p>
                    <div className="card-actions">
                        <button type="button" onClick={onEdit} aria-label="Editar item">
                            Editar
                        </button>
                        <button
                            type="button"
                            onClick={onDelete}
                            aria-label="Remover item"
                        >
                            Excluir
                        </button>
                    </div>
                </span>
            </div>
        </div>
    );
}