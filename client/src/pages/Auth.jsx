import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [user, setUser] = useState('');

  const submitForm = async (e) => {
    e.preventDefault();

    try{
      await fetch('http://127.0.0.1:8000/api/login/',{
        method: "POST",
        headers:{
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        withCredentials: true,
        body: JSON.stringify({
          email, password
        })
          
      })
      .then(response => {
        if(response.ok){
          console.log("авторизация прошла успешно");
          navigate('/');
          window.location.reload();
        }
        else{
          console.log('Ошибка авторизации');
        }

      })
      
    }
    catch(error){
      console.error(error);
      console.log('Ошибка авторизации');
    }
    

  }

  return (
    <>
      <div className="Auth" onSubmit={submitForm}>
        
          <form className="Auth__block">
            <h2 className="Auth__title">Авторизация</h2>
            <div className="Auth__content">
              <input type="email" className="Auth__input" placeholder="Email"
                onChange={e => setEmail(e.target.value)} required/>
              <input type="password" className="Auth__input" placeholder="password"
                onChange={e => setPassword(e.target.value)} required/>
            </div>
            <Link to="/registration" className="Auth__link">Зарегистрироваться</Link>
            <button type="submit" className="Auth__btn">вход</button>
            
          </form>
        </div>
      
    </>
  )
}

export default Auth
