import styles from './styles.module.scss'
import Layout from '../../components/Layout'
import { useUser } from '../CurrentUser'
import BookCover from '../../components/BookCover'
import { caminhoAPIBase as APIPath } from '../../utils/myConfig'

export default function Books( { booksRequest } ){

    const booksRow1 = []
    const booksRow2 = []

    if (booksRequest.length > 0)
        for(let i = 0; i < booksRequest.length; i++)
            ( i % 2 === 0 ) ? booksRow1.push(booksRequest[i]) : booksRow2.push(booksRequest[i])
    

    const currentUser = useUser()

    var isLogged = currentUser.isLogged

    return (
        <Layout logged={isLogged} currentPage="Livros">
            <div className={styles.container}>
                <div className={styles.books_list}>

                    {/** Destaques, os livros mais lidos ou recém-criados com mais vizualizações em um periodo curto de tempo.
                     * Este será padrão. */}                
                    { (booksRow1.length > 0) ? (
                    <>
                        <span className={styles.books_title}>Destaques</span>

                        <div className={styles.books_row}>
                            { booksRow1.map( (theBook) => { return <BookCover book={theBook} key={theBook.id}/> } ) }
                        </div>
                        
                        { (booksRow2.length > 0) ? (
                        <>
                            <div className={styles.books_row}>
                            { booksRow2.map( (theBook) => { return <BookCover book={theBook} key={theBook.id}/> } ) }
                            </div>
                        </>
                        ) : null }
                    </>
                    ) : (
                        <div className={styles.no_books}> Nada encontrado. </div>
                    ) }

                </div>
                    
                <div className={styles.books_list}>
                    
                    {/** Recomendados, será outra lista. 
                     *  Baseada no usuario caso esteja logado, ou padrão pelo próprio site, caso não logado(talvez) 
                     *  Por enquanto pegando informações repitidas. */}                    
                    { (booksRow1.length > 0) ? (
                    <>
                        <span className={styles.books_title}>Recomendados</span>

                        <div className={styles.books_row}>
                            { booksRow1.map( (theBook) => { return <BookCover book={theBook} key={theBook.id}/> } ) }
                        </div>
                        
                        { (booksRow2.length > 0) ? (
                        <>
                            <div className={styles.books_row}>
                            { booksRow2.map( (theBook) => { return <BookCover book={theBook} key={theBook.id}/> } ) }
                            </div>
                        </>
                        ) : null }
                    </>
                    ) : (
                        <div className={styles.no_books}> Nada encontrado. </div>
                    ) }
                </div>
            </div>
        </Layout>

    )
}

export async function getServerSideProps(){
    const res = await fetch(APIPath + '/books')
    const booksRequest = await res.json()
  
    return { props: { booksRequest } }
}