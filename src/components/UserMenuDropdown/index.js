import React, { useEffect, useState } from "react"
import Link from 'next/link'
import s from './styles.module.scss'
import { useUser } from "../../pages/CurrentUser"
import { useRouter } from "next/router"

export default function UserMenuDropDown({ active }){

    const [isBrowser, setIsBrowser] = useState(false)

    const router = useRouter()

    useEffect(()=> { setIsBrowser(true) }, [])

    if(isBrowser == true){
        var menu = document.getElementById('user-menu-dropdown')

        if(active == true){
            menu.style.top = "5.34rem"            
        }else{
            var size = menu.offsetHeight;
            menu.style.top = "calc(-" + size + "px + 5.34rem)" //calcula o quanto vai subir pelo tamanho da div
        }
    }

    function disconnectHandler(event){
        event.preventDefault()
        const user = useUser()
        user.username = ''
        user.isLogged = false   
        
        router.push('/')
    }

    return(
    <div className={s.container} id="user-menu-dropdown">
            {/*<button className={s.option}>Perfil</button>
            <hr className={s.separator} />*/}
            <Link href="/">
                <button className={s.option} onClick={disconnectHandler}>Desconectar-se</button>
            </Link>
            
    </div>)
}