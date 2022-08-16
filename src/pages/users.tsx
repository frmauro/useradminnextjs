import React, { useState, useEffect } from 'react'
import Layout from '../components/template/Layout' 
import Tabela from '../components/template/Tabela';
import Usuario from '../model/Usuario';

import UserService from '../services/userService'


export default function Users(){
    const [users, setUsers] = useState([]);


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
        console.log(user.name)
    }

    function DelectedUser(user: Usuario){
        console.log(`Excluir... ${user.name}`)
    }

    return(
        <div className={`
                flex justify-center items-center h-screen 
                bg-gradient-to-r from-blue-500 to-purple-500
                
        `} >
            <Layout titulo="Página de usuários" subtitulo="Página de usuários">
                <Tabela users={users} userSelected={SelectedUser} userDelected={DelectedUser}></Tabela>
            </Layout>
       </div>
    )
}