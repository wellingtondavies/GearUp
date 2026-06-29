import caixasfundo4 from '../assets/images/caixasfundo4.jpg'
import logo from '../assets/svgs/logo.svg'
import { route } from "preact-router";
import type { FunctionComponent } from "preact";
import type { RoutableProps } from "preact-router";
import '../styles/login.css'
import '../styles/utility.css'

const Home = (props: RoutableProps) => {
    return(
        <>
        
        <main className='sing-in'>
            
        
            <section className='content'>

                <div className='information'>
                    
                    <div class='title'>
                        <h1>Crie sua conta</h1>
                        <p>
                            Cadastre-se para anunciar ou alugar itens
                            de forma rápida e segura.
                        </p>
                    </div>

                    <form>
                        
                        <input 
                            type="text" 
                            placeholder="Nome"
                        />

                        <input 
                            type="email"
                            placeholder="Seu e-mail"
                        />

                        <input 
                            type="password"
                            placeholder="Senha"
                        />

                        <input 
                            type="password"
                            placeholder="Confirme sua senha"
                        />

                    </form>

                    <div>
                        <button>Criar conta</button>
                        <p>
                            Ja tem uma conta?
                            <span
                            onClick={() => route("/login")}
                            style={{ cursor: "pointer" }}
                            >
                                 Entrar
                            </span>
                        </p>
                    </div>
                </div>


            </section>

            <section className='image'>

                <img src={caixasfundo4} alt="" />
                
            </section>
        </main>
        </>
    )
}
export default Home;