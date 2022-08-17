import Usuario from "../Usuario";


export default class ConcreteUser implements Usuario {
    #id: string;
    #email: string;
    #name: string;
    #token: string;
    #password: string;
    #userType: string;
    #status: string;

    constructor(email: string, name: string, token: string, password: string, userType: string, status: string, id: string = null){
        this.#email = email
        this.#name = name
        this.#password = password
        this.#token = token
        this.#userType = userType
        this.#status = status
        this.#id = id
    }

    static empty(){
        return new ConcreteUser('', '', '', '', '', '')
    }

    get id() {
        return this.#id
    }
    get email() {
        return this.#email
    }
    get name() {
        return this.#name
    }
    get password() {
        return this.#password
    }
    get token() {
        return this.#token
    }
    get userType() {
        return this.#userType
    }
    get status() {
        return this.#status
    }
}