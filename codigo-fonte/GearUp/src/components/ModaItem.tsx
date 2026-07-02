import type { Item } from "../types/item";

import '../styles/modalItens.css'

interface ModalItensProps{
    item: Item;
    onClose: () => void;
}


export default function ModalItens({item, onClose}: ModalItensProps){
    return(

        <div className='modal-card'>
            <img src={item.imagem} alt="" />

            <div className='modal-content'>
                
                <h1>{item.titulo}</h1>

                <p className='descricao'>{item.descricao}</p>

                <p className='valor'>R${item.valorDia},00</p>
            </div>

            <div className='buttons'>

                <button>Editar</button>

                <button>Excluir</button>

                <button onClick={onClose}>Fechar</button>

            </div>
        </div>
    )
}