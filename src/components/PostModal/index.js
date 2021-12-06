import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import { FiX } from 'react-icons/fi';
import { useUser } from '../../pages/CurrentUser';
import { caminhoAPIBase } from '../../utils/myConfig';

import style from './styles.module.scss'

export default function Modal({ show, onClose, posts = []}){
    const [isBrowser, setIsBrowser] = useState(false);

    const userInfo = useUser();

    useEffect(()=> { setIsBrowser(true) }, [])

    const handleClose = (e) => {
        e.preventDefault()
        onClose()        
    }

    const makePost = async e => {
        e.preventDefault()
        onClose()

        const post = {
            "text": e.target.user_post.value,
            "author": userInfo.username
        }

        var bodyJson = JSON.stringify(post);

        const res = await fetch(caminhoAPIBase + '/posts', { body: bodyJson, mode: "cors", cache:"default", headers:{"Content-Type": "application/json"}, method:"POST"});

        const data = await res.json();

        // ***Fazer a parte do POST funcionar para realizar a postagem rápida e atualizar a página com o novo post.

        // var bodyJSON = JSON.stringify({
        //     author : user.username,
        //         text : e.target.user_post.value
        //     })

        // var request = JSON.stringify({
        //     body: bodyJSON,
        //     headers:{"Content-Type": "application/json"},
        //     method: "POST"
            
        // })

        // console.log(request)        

        // const res = await fetch('/api/hello',JSON.parse(request))

        // const result = await res.json().then((res)=> console.log(res.info))

        window.location.reload();
        
    }

    const content = show ? (
        <div className={style.overlay}>
                <div className={style.container}>
                    <div className={style.head}>
                        <span className={style.title}>Publicação Rápida</span>                        
                        <FiX className={style.close_btn} color='white' onClick={handleClose} />                        
                    </div>

                    <span className={style.subtitle}>Faça uma publicação rapidamente em texto</span>
                    <form onSubmit={makePost}>
                        <textarea type='text' className={style.input} placeholder='Publicação...' name='user_post' id='user_post'/>                    
                        <button type="submit" className={style.publish_btn}>Publicar</button>
                    </form>
                </div>
            </div>
    ) : null;

    if(isBrowser){
        return ReactDOM.createPortal(
            content,
            document.getElementById('modal-root')
        )
    } else {
        return null
    }
}