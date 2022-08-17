import Usuario from "../../model/Usuario";
import { IconeEdit, IconeTrash } from "../icons/Index";

interface TabelaProps{
    users: Usuario[]
    userSelected?: (user: Usuario) => void
    userDelected?: (user: Usuario) => void
}
export default function Tabela(props: TabelaProps){

    const viewActions = props.userDelected || props.userSelected

    function renderizarCabecalho(){
        return (
            <tr>
                <th className="text-left p-4">ID</th>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">UserType</th>
                <th className="text-left p-4">Status</th>
                { viewActions ? <th className="p-4">Actions</th> : false}
            </tr>
        )
    }

    function renderizarDados(){
        return (
            props.users.map((user, i) => {
                return (
                    <tr key={user.id}  
                     className={`${i % 2 === 0 ? 'bg-purple-200' : 'bg-purple-100'}`} >
                        <td className="text-left p-2">{user.id}</td>
                        <td className="text-left p-2">{user.name}</td>
                        <td className="text-left p-2">{user.email}</td>
                        <td className="text-left p-2">{user.userType}</td>
                        <td className="text-left p-2">{user.status}</td>
                        {viewActions ? renderizarAcoes(user) : false}
                    </tr>
                )
            })
        )
    }

    function renderizarAcoes(user: Usuario){
        return (
            <td className={`flex justify-center`}>
                {props.userSelected ? (
                        <button onClick={() => props.userSelected?.(user)} className={`
                        flex justify-center items-center 
                        text-green-600 rounded-full p-1 m-1
                        hover:bg-purple-50
                    `}>{IconeEdit}</button>
                ) : false}
                {props.userDelected ? (
                        <button onClick={() => props.userDelected?.(user)} className={`
                        flex justify-center items-center 
                        text-red-500 rounded-full p-1 m-1
                        hover:bg-purple-50
                    `}>{IconeTrash}</button>
                ) : false}
            </td>
        )
    }

    return (
                <table className="w-full rounded-xl overflow-hidden">
                    <thead className={`
                      bg-gradient-to-r from-purple-500 to-purple-800
                    `}>
                        {renderizarCabecalho()}
                    </thead>
                    <tbody>
                        {renderizarDados()}
                    </tbody>
                </table>
    )
}