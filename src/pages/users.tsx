import React, { useState, useEffect } from 'react'
import Botao from '../components/template/botao';
import Formulario from '../components/template/Formulario';
import Layout from '../components/template/Layout' 
import Tabela from '../components/template/Tabela';
import ConcreteUser from '../model/ConcreteModel/ConcreteUser';
import Usuario from '../model/Usuario';

import UserService from '../services/userService'


export default function Users(){
    const [users, setUsers] = useState([]);
    const [visible, setVisible] = useState<'table' | 'form'>('table')
    const [user, setUser] = useState<Usuario>(ConcreteUser.empty())


    useEffect(() => {

            async function getUsers(){
                await UserService.getUserServiceInstance()
                .getUsers()
                .then(users => {
                    setUsers(users);
                });
            }

            getUsers();

    }, [])

    function SelectedUser(user: Usuario){
        setUser(user)
        setVisible('form')
        //console.log(user.name)
    }

    function DelectedUser(user: Usuario){
        //console.log(`Excluir... ${user.name}`)
    }

    function newUser(){
        setUser(ConcreteUser.empty())
        setVisible('form')
    }

    function SalvarUser(user: Usuario){
        //console.log(user)
        setVisible('table')
    }

    return(
        <div className={`
                flex justify-center items-center h-screen 
                bg-gradient-to-r from-blue-500 to-purple-500
                
        `} >
            <Layout titulo="Página de usuários" subtitulo="Página de usuários">
                {visible === 'table' ? (
                    <>
                        <div className="flex justify-end">
                            <Botao onClick={newUser} cor="green" className="mb-4">New User</Botao>
                        </div>
                        <Tabela users={users} userSelected={SelectedUser} userDelected={DelectedUser}></Tabela>
                    </>

                ) : (
                    <Formulario onUserChanged={SalvarUser} onCanceled={() => setVisible('table')} user={user} ></Formulario>
                )}
            </Layout>
       </div>
    )
}