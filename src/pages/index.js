import Layout from '../components/Layout'
import styles from '../styles/Home.module.scss'
import Login from '../components/Login'
import { useRouter } from 'next/router'
import { useUser } from './CurrentUser'
import { useEffect } from 'react'

export default function Home() {  

  const user = useUser()

  const router = useRouter()
  
  useEffect( () => {  if(user.isLogged) router.push('/feed')  }, [user])
  
  return(    
      <Layout logged={false} currentPage="Login" noHeader={true}>
        <div className={styles.tela}>        
          <Login />
        </div>        
    </Layout>         
  )
}