import '../styles/cardItens.css'

interface CardItensProps{
    imagem: string;
    titulo: string;
    valor: number;
}

export default function CardItens({imagem, titulo, valor}: CardItensProps){

    return(
        <div className='card'>
                    <img src={imagem} alt=""  />
                    <div className='card-information'>
                        <h2>{titulo}</h2>
                        <span>
                            <p>R${valor},00</p>
                            <button> + </button>
                        </span>                    
                    </div>
                </div>
    )
}