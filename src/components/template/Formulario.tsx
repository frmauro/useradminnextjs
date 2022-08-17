import { useState } from "react";
import ConcreteUser from "../../model/ConcreteModel/ConcreteUser";
import Usuario from "../../model/Usuario";
import AvatarUsuario from "./AvatarUsuario";
import Botao from "./botao";
import Input from "./Input";

interface FormularioProps{
    user: Usuario
    onUserChanged?: (user: Usuario) => void
    onCanceled?: () => void
}

export default function Formulario(props: FormularioProps){
    const id = props.user?.id
    const [name, setName] = useState(props.user?.name ?? '')
    const [email, setEmail] = useState(props.user?.email ?? '')
    const [password, setPassword] = useState(props.user?.password ?? '')
    const [userType, setUsertype] = useState(props.user?.userType ?? 'administrator')
    const [status, setStatus] = useState(props.user?.status ?? 'active')
    const [token, setToken] = useState(props.user?.token ?? '99999999999')

    let itemsStatus = ['Active', 'Inactive']
    let itemsUserTypes = ['administrator', 'client']

    function handleStatus(e){
        setStatus(e.target.value)
    }

    function handleUserType(e){
        setUsertype(e.target.value)
    }

    return (
        <div>
            {id ? (
                <Input text="Id" value={id} readonly className="mb-4" />
            ) : false}
            <Input text="Name" value={name} onChange={setName} className="mb-4" />
            <Input text="Email" value={email} onChange={setEmail} />
            <Input text="Password" value={password} onChange={setPassword} />
            <div className={`flex flex-col `}>
                <label>Status</label>
                <select value={status} onChange={handleStatus} >
                    <option value="" disabled selected>Choose your option</option>
                    {
                        itemsStatus.map((item, index) => <option key={index} value={item}>{item}</option>)
                    }
                </select>
                <label>UserType</label>
                <select value={userType} onChange={handleUserType} >
                <option value="" disabled selected>Choose your option</option>
                    {
                        itemsUserTypes.map((item, index) => <option key={index} value={item}>{item}</option>)
                    }
                </select>
            </div>
            <div className="flex justify-end mt-7">
                <Botao cor="blue" className="mr-2" onClick={() => props.onUserChanged?.(new ConcreteUser(email, name, '', password, userType, status, id))} >
                    {id ? 'Update' : 'Insert'}
                </Botao>
                <Botao onClick={props.onCanceled} cor="gray" className="mr-2">
                     Cancelar
                </Botao>
            </div>
        </div>
    )
}