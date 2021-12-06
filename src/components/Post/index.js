import Image from 'next/image'
import postUserIcon from '../../images/temp/Sample_User_Icon.png'
import {HiDotsVertical} from 'react-icons/hi'
import React, {useEffect} from 'react'
import author1Img from '../../images/temp/AuthorUserExample1.jpg'
import author2Img from '../../images/temp/AuthorUserExample3.jpg'
import author3Img from '../../images/temp/AuthorUserExample2.jpg'
import userImg from '../../images/temp/UserTest.jpg'
import { findUserImg } from '../../utils/findUserImg'

import styles from './styles.module.scss'
import { useUser } from '../../pages/CurrentUser'

//style: feed.css
export default function Post({logged, postInfo}){
    //postInfo.author, postInfo.text, postInfo.commentCount(function), postInfo.lastComments(function), postInfo.compareDate(function)    
    
    useEffect(() => {quebraTexto(postInfo.text)}, [this])//para evitar o erro no document do javascript, já que o código é executado no servidor.    

    const user = useUser();

    function quebraTexto(str){
        var br_match
        
        do {
            br_match = str.search(/([\n])/)

            if(br_match != -1)
                str = str.slice(0, br_match) + "<br>" + str.slice(br_match)
            
        }
        while(br_match =! -1)        

        //bota texto no elemento do html, pois str é só texto formatado.
        var postId = 'post-' + postInfo.id;
        var doc = document.getElementById(postId).parentNode.getElementsByTagName('p')[0]

        if(doc)
            doc.innerHTML = str
        
    }    

    //terá uma função que irá buscar a imagem do usuário no servidor onde será feito o upload pelo usuario
    
    return(        
        <div className={styles.container}>
            <input type="hidden" id={"post-" + postInfo.id} />
            <div className={styles.header}>
                <div className={styles.userinfo}>
                    <Image className={styles.usericon} width={56} height={56} src={findUserImg(postInfo.author)}/>
                    <span className={styles.username}>{postInfo.author}</span>
                </div>

            
                <div className={styles.postinfo}>
                    {/** Aqui, na hora da busca pelo post, deve ser feito um calculo com a hora do post baseado na data atual */}
                    <span className={styles.time}>Há poucos segundos</span>
                    <HiDotsVertical id="feed-options" className={styles.options} />
                </div>                
            </div>

            <div className={styles.body}>
                <p className={styles.text} id="post-text"></p>
                
            </div>

            <div className={styles.comments}>
                <span className={styles.number}>0 comentários</span>
                {logged==true? 
                    (<div className={styles.user_area}>
                        <Image src={findUserImg(user.username)} width={48} height={48} alt="User Icon" className={styles.user_icon} layout="fixed"/>
                        <textarea type="text" className={styles.user_input} name="user-comment" id="comment-user-input" placeholder='Deixe um comentário'/>
                        {/** criar um comentario como var e tenta usar ele como referencia para as interaçoes como onChange, passando a referencia certa */}
                    </div>)
                    : null
                }
            </div>
        </div>        
    )

}