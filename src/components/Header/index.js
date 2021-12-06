import { VscAccount } from 'react-icons/vsc'
import { IoIosArrowDown } from 'react-icons/io'
import Image from 'next/image'
import Link from 'next/link'
import styles from './styles.module.scss';
import { findUserImg } from '../../utils/findUserImg';

export default function MyHeader({ logged, userInfo, menuActive, displayMenuFunc }){

    var notActive = !menuActive

    function profileContainer(){
        //pega informações do userInfo, que será feito chamando a api para pegar os dados
        //por agora, como é demonstração, é melhor já estar built-in
        if(logged == true)
            return(
                <div className={styles.profile}>
                    <div className={styles.img} onClick={() => {displayMenuFunc(notActive)}}>                                    
                        <Image src={findUserImg(userInfo.username)} width={64} height={64} alt="User Icon" className={styles.usericon} layout="fixed"/>
                        <span className={styles.name}>{userInfo.username}</span>
                        <IoIosArrowDown color="white" className={styles.dropdown_btn} id="arrow-dropDown-btn"/>
                    </div>
                </div>
            )
        else
            return(
                <div className={styles.login}>
                    <Link href="/">
                        <button className={styles.btn}>
                        <VscAccount color="white" className={styles.icon}/>
                        <span className={styles.text}>Entrar</span>
                        </button>
                    </Link>
                </div>
            )
    }
    

    return(
        <>
        <header className={styles.header}>
            <span className={styles.logo}>BookReaders</span>

            <nav className={styles.nav}>

                <Link href="/feed">
                    <ul>Feed</ul>
                </Link>                

                {/*<ul>Histórias</ul>*/}

                <Link href="/books">
                    <ul>Livros</ul>
                </Link>

            </nav>

            {profileContainer()}
        </header>
        </>
    )
}