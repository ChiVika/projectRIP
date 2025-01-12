import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./PostForm.css";

function PostForm({ user }) {
  const navigate = useNavigate();
  const [work, setWork] = useState({
    title: "",
    desc: "",
    img: null,
  });
  const [previewImg, setPreviewImg] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWork({
      ...work,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setWork({
      ...work,
      img: file,
    });
    setPreviewImg(URL.createObjectURL(file));
  };

  const navigates = () => {
    navigate(`/profile`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", work.title);
    formData.append("image", work.img);
    formData.append("description", work.desc);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/", formData, {
        withCredentials: true,
      });
      console.log("Работа успешно добавлена", response.data);
      navigates();
    } catch (error) {
      console.error("Ошибка при добавлении работы", error);
    }
  };

  return (
    <div className="AddWork">
      <h1 className="AddWork__title">Добавление новой работы</h1>
      <div className="AddWork__container">
        <form className="AddWork__form" onSubmit={handleSubmit}>
          <div className="AddWork__img">
            {previewImg ? (
              <>
                <img src={previewImg} alt="Preview" className="AddWork__preview" />
                <input type="file" className="AddWork__img1" onChange={handleFileChange} />
              </>
            ) : (
              <input type="file" className="AddWork__img1" onChange={handleFileChange} />
            )}
          </div>
          <textarea className="AddWork__input" name="title" value={work.title} onChange={handleChange} placeholder="Заголовок"/>
          <textarea className="AddWork__desc" name="desc" value={work.desc} onChange={handleChange} placeholder="Описание"/>
          <button type="submit" className="AddWork__btn">Сохранить</button>
        </form>
      </div>
    </div>
  );
}

export default PostForm;
