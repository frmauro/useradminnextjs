import Image from 'next/image'
import router from 'next/router'
import Head from 'next/head'
import loading from '../../../public/images/loading.gif'
import useAuth from '../../data/hook/useAuth'

export default function ForcarAutenticacao(props) {
    const { usuario, carregando } = useAuth()

    function renderizarConteudo() {
        return (
            <>
            <Head>
                <script dangerouslySetInnerHTML={{
                    __html: `
                     if(!document.cookie?.includes("admin-user-auth")){
                         window.location.href = "/autenticacao"
                     }
                    `
                }} />
            </Head>
                {props.children}
            </>
        )
    }

    function renderizarCarregando() {
        return (
            <div className={`
              flex justify-center items-center h-screen
            `}>
                <Image src={loading} />
            </div>
        )
    }
    //console.log(carregando)
    //console.log(usuario)
    if (!carregando && usuario?.email) {
        return renderizarConteudo()
    } else if (carregando) {
        return renderizarCarregando()
    } else {
        router.push('/autenticacao')
        return null
    }
}