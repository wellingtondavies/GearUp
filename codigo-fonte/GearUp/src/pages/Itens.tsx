import type { RoutableProps } from "preact-router";
// import { route } from "preact-router";

import parafusadeira2 from '../assets/images/parafusadeira2.jpg'
import usuario from '../assets/images/iconeusuario.jpg'
import logo from '../assets/svgs/logo.svg'

import CardItens from "../components/CardItens";

import '../styles/itens.css'
import '../styles/utility.css'

const Itens = (props: RoutableProps) =>{
    return(
        <>
        <header>
            <span className='logo'>
                <img src={logo} alt='logo da gearUp' width={180} height={50} />
            </span>

            <div className="perfil-usuario">
                <p>
                    Bruno
                </p>

                <img src={usuario} alt='icone usuario' width={50} height={50}/>
            </div>
        </header>
        
        <main className='container2'>
            <div className='title-itens'>
                <h1>
                    Meus Anúncios
                </h1>

                <button>
                    Novo Anúncio +
                </button>
            </div>

            <section className='cards-grid'>
            
                <CardItens
                    imagem={parafusadeira2}
                    titulo="Parafusadeira"
                    valor={50}
                />
                <CardItens
                imagem={parafusadeira2}
                titulo="Parafusadeira"
                valor={50}
                />
                <CardItens
                imagem={parafusadeira2}
                titulo="Parafusadeira"
                valor={50}
                />

            </section>
        </main>
        </>
    )
}
export default  Itens;