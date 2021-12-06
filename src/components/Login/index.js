import { useUser } from '../../pages/CurrentUser';
import style from './style.module.scss'
import { useRouter } from 'next/router';

export default function Login(){        

  const currentUser = useUser();
  const router = useRouter();

  return(        
      <div className={style.area}>

        <span className={style.logo}>BookReaders</span>

        <span className={style.logintext}>Login</span>

        <form method='POST' onSubmit={ 
          async (event) => {
              event.preventDefault();
              var object = { username: event.target.user.value, password: event.target.pass.value }
              const data = await fetch('/api/login', {method : 'POST', body: JSON.stringify(object)});
              const user = await data.json();
              
              if(user.message == null){                                      
                currentUser.username = user[0].name
                currentUser.isLogged = true
                router.push('/feed')
                  
              }else{
                  console.log('errou')
                  
              }
          }        
      
      } id="login-form">
          <div className={style.input_login}>
            <label htmlFor="user" className={style.label}>Usuário</label>

            <input type="text" id="user" placeholder="Digite seu usuário..." className={style.input} />
          </div>

          <div className={style.input_login}>
            <label htmlFor="pass" className={style.label}>Senha</label>

            <input type="password" id="pass" placeholder="Digite sua senha..." className={style.input} />
          </div>

          <div className={style.checkbox_frm}>
            <input type="checkbox" id="staylogged" className={style.input}/>
            
            <label htmlFor="staylogged" className={style.label}>Manter conectado</label>
          </div>

          <span className={style.forgotpass}>Esqueci minha senha</span>

          {/*<Link href="/feed">*/}
            <button className={style.loginbtn} type='submit'>Entrar</button>
          {/*</Link>*/}
        </form>
      </div>      
    )
}