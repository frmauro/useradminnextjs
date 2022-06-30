import Link from "../../../node_modules/next/link";

interface MenuItemProps {
    url?: string
    className?: string
    texto: string
    icone: any
    onClick?: (evento: any) => void
}
export default function MenuItem(props: MenuItemProps) {

    function renderizarLink() {
        return (
            <a className={`
                flex flex-col justify-center items-center 
                h-20 w-20 dark:text-gray-200 
                ${props.className}
                `}>
                {props.icone}
                <span className={`text-xs font-light`}>
                    {props.texto}
                </span>
            </a>
        )
    }
    return (
        <li onClick={props.onClick} className={`
                hover:bg-gray-100 dark:hover:bg-gray-800
                cursor-pointer
        `}>
            {props.url ? (
                <Link href={props.url} >
                    {renderizarLink()}
                </Link>
            ) : (
                renderizarLink()
            )}
        </li>
    )
}