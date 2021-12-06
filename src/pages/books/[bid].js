import Layout from "../../components/Layout"
import style from "./book.module.scss"
import { useUser } from "../CurrentUser"
import { caminhoAPIBase as APIPath } from "../../utils/myConfig"

export default function Book( { book } ){

    const currentUser = useUser()

    var isLogged = currentUser.isLogged

    return (
        <Layout logged={isLogged} currentPage={book.title}>
            <div className={style.container}>
                <div className={style.book}>
                    <span className={style.title}>
                        {book.title}
                    </span>

                    <span className={style.author}>
                        Escrito por: {book.author}
                    </span>

                    <span className={style.content}>
                        {book.content}
                    </span>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context){

    const res = await fetch(APIPath + '/books/' + context.params.bid)
    const book = await res.json()

    if(!book) {
        return {
            redirect: {
                destination: '/books',
                permanent: false,
            },
        }
    }

    return {
        props: { book },
    }
}