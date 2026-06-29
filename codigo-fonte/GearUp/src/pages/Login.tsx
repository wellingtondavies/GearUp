import caixasfundo4 from '../assets/images/caixasfundo4.jpg'
import logo from '../assets/svgs/logo.svg'
import { route } from "preact-router";
import type { RoutableProps } from "preact-router";
import '../styles/home.css'
import '../styles/utility.css'

const Login = (props: RoutableProps) => {
    return(
        <>
        <main className='sing-in'>
            
        
            <section className='content'>
                
                {/* <span className='logo'>
                    <img src={logo} alt="logo GearUp" width={130} height={40} />
                </span> */}

                <div className='information'>
                    
                    <div class='title'>
                        <h1>Entre na sua conta</h1>
                        <p>
                            Entre para anunciar ou alugar itens
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


                    </form>

                    <div>
                        <button>Entrar</button>
                        <p>
                            Não tem uma conta?
                            <span
                                onClick={() => route("/")}
                                style={{ cursor: "pointer" }}
                            >
                                Registre-se
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
export default Login;