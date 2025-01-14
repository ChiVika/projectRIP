import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import './Register.css';
import './Auth.css';

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    if (!email || !password || !repeatPassword) {
      console.log("Все поля должны быть заполнены");
      return;
    }
    if (password !== repeatPassword) {
      console.log("Пароли не совпадают");
      return;
    }
    try {
      const response = await axios.post('http://127.0.0.1:8000/register/', {
        email,
        password,
      });

      console.log("Регистрация прошла успешно!");
      navigate('/auth');
    } catch (error) {
      console.error(error);
      console.log('Ошибка регистрации');
    }
  };

  return (
    <div className="Register">
      <form className="Register__block" onSubmit={submitForm}>
        <h2 className="Register__title">Регистрация</h2>
        <div className="Register__content">
          <input
            type="email"
            placeholder="Email"
            className="Register__input"
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="Register__input"
            onChange={e => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Repeat Password"
            className="Register__input"
            onChange={e => setRepeatPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="Register__btn">Зарегистрироваться</button>
      </form>
    </div>
  );
}

export default Register;
