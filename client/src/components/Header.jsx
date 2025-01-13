import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";

function Header({user}) {
  return (
    <header className='header'>
      <nav className='header__nav'>
        <ul className='header__container'>
          <li><Link to="/">Главная</Link></li>
          <li><Link to="/chat">Общий чат</Link></li>
          {(user.detail === 'Не аунтифицирован!' || user.detail === "Пользователь не найден") 
          ? (<Link to="/auth" className='header__button'>Войти</Link>) :
          (<Link to="/profile" className='header__button'>{user.username}</Link>)}
          
        </ul>
        
      </nav>
    </header>
  );
}

export default Header;
