import { useState } from "react";
import Usuario from "../../model/Usuario";
import Botao from "./botao";
import Input from "./Input";

interface FormularioProps{
    user: Usuario
}

export default function Formulario(props: FormularioProps){
    const id = props.user?.id
    const [name, setName] = useState(props.user?.name ?? '')
    const [email, setEmail] = useState(props.user?.email ?? '')
    const [password, setPassword] = useState(props.user?.password ?? '')
    return (
        <div>
            {id ? (
                <Input text="Id" value={id} readonly className="mb-4" />
            ) : false}
            <Input text="Name" value={name} onChange={setName} className="mb-4" />
            <Input text="Email" value={email} onChange={setEmail} />
            <Input text="Password" value={password} onChange={setPassword} />
            <div className="flex justify-end mt-7">
                <Botao cor="blue" className="mr-2">
                    {id ? 'Update' : 'Insert'}
                </Botao>
                <Botao cor="gray" className="mr-2">
                     Cancelar
                </Botao>
            </div>
        </div>
    )
}