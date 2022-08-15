import route from 'next/router'
import { createContext, useEffect, useState } from "react";
import Usuario from "../../model/Usuario";
import UserService from '../../services/userService';
import Cookies from 'js-cookie'

interface AuthContextProps {
    usuario?: Usuario
    carregando?: boolean
    login?: (email: string, password: string) => Promise<void>
    createAccount?: (email: string, password: string) => Promise<void>
    logout?: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({})

function usuarioNormalizado(): Usuario {
    return {
        id: "123456778",
        email: "frmauro8@gmail.com",
        name: "Francisco",
        token: "653466757867tyetyrety",
        password: "123",
        urlImage: "#"
    }
}

function gerenciarCookie(logado: boolean) {
    if (logado) {
        Cookies.set('admin-user-auth', logado, {
            expires: 7
        })
    } else {
        Cookies.remove('admin-user-auth')
    }
}

export function AuthProvider(props) {
    const [carregando, setCarregando] = useState(true)
    const [usuario, setUsuario] = useState<Usuario>(null)

    function configuraSessao(user) {
        const usuario = usuarioNormalizado()
        if (user.email) {
            gerenciarCookie(true)
            setCarregando(false)
            return usuario.email
        } else {
            gerenciarCookie(false)
            setCarregando(true)
            return false
        }
    }

    function createAccount(email, password) {

        try {
            // ******** aqui faz a requisição para a api de usuario *******
            setCarregando(true)
            const usuario = usuarioNormalizado()
            configuraSessao(usuario)
            route.push('/')
        } finally {
            setCarregando(false)
        }
    }

    async function login(email, password) {

        try {
            // ******** aqui faz a requisição para a api de usuario *******
            let users = await UserService.getUserServiceInstance()
                .getUsers()
                .then(items => {
                    console.log(items)
                });

            setCarregando(true)
            const usuario = usuarioNormalizado()
            console.log(usuario)
            setUsuario(usuario)
            configuraSessao(usuario)
            route.push('/')
        } finally {
            setCarregando(false)
        }
    }

    function logout() {
        try {
            setCarregando(true)
            configuraSessao(null)
        } catch (error) {
            setCarregando(false)
        }
    }

    useEffect(() => {
        if (Cookies.get('admin-user-auth')) {
            console.log('auth user ok')
        } else {
            setCarregando(false)
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            usuario,
            carregando,
            createAccount,
            login,
            logout
        }} >
            {props.children}
        </AuthContext.Provider>

    )
}

export default AuthContext