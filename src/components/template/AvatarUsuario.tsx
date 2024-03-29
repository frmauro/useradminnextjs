import Link from "../../../node_modules/next/link";
import useAuth from "../../data/hook/useAuth";

interface AvatarUsuarioProps {
    className?: string
}

export default function AvatarUsuario(props: AvatarUsuarioProps) {
    const { usuario } = useAuth()
    return (
        <Link href="/perfil" >
            <img
                src='/images/avatar.svg'
                alt="Avatar do Usuário"
                className={`
                    h-10 w-10 rounded-full cursor-pointer 
                    ${props.className}
            `} />
        </Link>
    )
}