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

function usuarioNormalizado(userVm: any): Usuario {
    //console.log(userVm)
    return     {
        id: userVm.id === '' ? "123456778" : userVm.id,
        email: userVm.email === '' ? "frmauro8@gmail.com" : userVm.email,
        name: userVm.name === '' ? "Francisco" : userVm.name,
        token: userVm.token === '' ? "99999999999" : userVm.token,
        password: userVm.password === '' ? "123" : userVm.password,
        status: userVm.status === '' ? 'active' : userVm.status,
        userType: userVm.userType === '' ? 'client' : userVm.userType,
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

    function configuraSessao(user: Usuario) {
        //let userVm = { id: '', email: user.email, name: '', token: '', password: user.password, urlImage: '' };
        //const usuario = usuarioNormalizado(userVm)
        console.log(user)
        if (user != null) {
            if (user.email){
                gerenciarCookie(true)
                setCarregando(false)
                setUsuario(user)
                return user.email
            }
        } else {
            gerenciarCookie(false)
            setCarregando(true)
            return false
        }
    }

    async function createAccount(email, password) {

        try {
            // ******** aqui faz a requisição para a api de usuario *******
            setCarregando(true)
            let userVm = { id: '', email: email, name: '', token: '', password: password, urlImage: '' };
            const usuario = usuarioNormalizado(userVm)
            configuraSessao(usuario)
            route.push('/')
        } finally {
            setCarregando(false)
        }
    }

    async function login(email, password) {

        try {
            let userVm = { email: email, password: password };
            //console.log(userVm)
            let response = await UserService.getUserServiceInstance()
                .findUserByEmailAndPassword(userVm)
                .then(resUser => {
                    //console.log(`antes do incremento do email ${resUser.email}`)
                    resUser.email = email;
                    //console.log(`depois do incremento do email ${resUser.email}`)
                    setCarregando(true)
                    const usuario = usuarioNormalizado(resUser)
                    //console.log(usuario)
                    //setUsuario(usuario)
                    configuraSessao(usuario)
                    route.push('/users')
                });

        } finally {
            setCarregando(false)
        }
    }

    async function logout() {
        try {
            setCarregando(true)
            await configuraSessao(null)
        } finally {
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