import Post from '../../components/Post'
import PostModal from '../../components/PostModal'
//import userImg from '../images/temp/UserTest.jpg'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import confusionR from '../../images/temp/confused.png'
import cryingR from '../../images/temp/crying.png'
import furiousR from '../../images/temp/furious.png'
import happyR from '../../images/temp/smile.png'

import style from './styles.module.scss'
import Layout from '../../components/Layout'
import { findUserImg } from '../../utils/findUserImg'
import { useUser } from '../CurrentUser'
import { caminhoAPIBase as APIPath } from '../../utils/myConfig'

export default function Feed( { postsRequest } ){       

    const currentUser = useUser()

    var isLogged = currentUser.isLogged

    const [showPostModal, setShowPostModal] = useState(false)    

    useEffect(
        () => {}
    , [ postsRequest ])

    return (
        <>{ isLogged == true ? 
            // logged é true
            <Layout logged={isLogged} currentPage="Feed">

                <div id='modal-root'></div>                    

                <div className={style.container}>

                    <div className={style.user_post}>
                        <Image src={findUserImg(currentUser.username)} width={48} height={48} alt="User Icon" className={style.icon} layout="fixed"/>
                        <button className={style.btn} onClick={()=> setShowPostModal(true)}>Criar Publicação Rápida...</button>
                        <PostModal onClose={() => setShowPostModal(false)} show={showPostModal} posts={postsRequest}/>
                    </div>

                    <div className={style.scroll}>
                        { /*(props != null & props.posts != null) ? props.*/ postsRequest.map( post => {                                                        
                        return(
                            <div className={style.post} key={post.id}>
                                <Post logged={isLogged} postInfo={post} />
                                {/* Aqui, cada interaction terá uma function que irá tratar essa parte de mostrar o que o usuário interagiu ao alterar o botão para ativo e atualizar o banco com um form. */}
                                {/* Cada botão terá um id interno, que indicará qual foi clicado e qual informação será enviada para o banco, de acordo com o id do post */}
                                <div className={style.interactions}>
                                    <Image src={happyR} alt="Happy Reaction" width={36} height={36} className={style.img_interaction} key='H'/>

                                    <Image src={cryingR} alt="Crying Reaction" width={36} height={36} className={style.img_interaction} key='C'/>

                                    <Image src={confusionR} alt="Apathetic Reaction" width={36} height={36} className={style.img_interaction} key='A'/>

                                    <Image src={furiousR} alt="Furious Reaction" width={36} height={36} className={style.img_interaction} key='F'/>
                                </div>
                        </div>)
                        })
                        //: null
                        }
                    </div>
                </div>                
            </Layout> : 
                //não logado, logged = false
                <Layout logged={isLogged} currentPage="Feed">
                    <div className={style.container}>
                        <h1 style={ { gridRowStart: 2, gridColumnStart: 2, height: 'calc(100vh - 5.34rem - 124px )' }}>Faça login para acessar o conteudo.</h1>

                    </div>
                </Layout>
            
        }</>            
    )
}

export async function getServerSideProps(){
    const res = await fetch(APIPath + '/posts' + '?_sort=id&_order=desc')
    const postsRequest = await res.json()
  
    return { props: { postsRequest } }
  }