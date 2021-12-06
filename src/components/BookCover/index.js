import styles from './styles.module.scss'
import Link from 'next/link'

/**
 * book = { 
 *  id: num,
 *  title: string,
 *  autor: string,
 *  description: string
 * }
 * 
 * capa: pega no utils na mesma forma que o do user. It's a prototype, after all.
 */

export default function BookCover( { book } ){
    return(
        <Link href={"/books/" + book.id}>
            <div className={styles.container}>            
                <img className={styles.cover} src="https://www.hypeness.com.br/1/2018/12/imagens-surreais.jpg" alt="Capa do Livro" />
                
                <div className={styles.side_content}>                
                    <span className={styles.title}>
                        {book.title}
                    </span>

                    <span className={styles.author}>
                        {book.author}
                    </span>

                    <span className={styles.description}>
                        {book.description}
                    </span>
                </div>
            </div>
        </Link>
    )
}