
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./PostList.css";

function MyProfile({user}) {
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
          axios.get('http://127.0.0.1:8000/api/posts/user/', {
            withCredentials: true,
          })
            .then(response => {
              setPosts(response.data);
              console.log(response.data);
            })
            .catch(error => {
              console.error('Error fetching posts:', error);
            });
      }, []);
    
      const deletePost = async(id) => {
        try{
          const response = await axios.delete(`http://127.0.0.1:8000/api/${id}/`, { 
            withCredentials: true
          });
          setPosts(posts.filter(post => post.id !== id));
        }
        catch (error) {
          console.error('Проблемы с удалением', error);
      }
      }
      const navigate = useNavigate();
      const navigateEdit = (id) => {
        navigate(`/editPost/${id}/`);
    }
    return (
        <>
        <div className='PostList__Add-container'>
            <h1 className='PostList__Add-title'>Мои посты</h1>
            <Link to="/create-post">
            <button className='PostList__Add'>Добавить пост</button>
            </Link>
        </div>
        <div className='PostList'  style={{width: "1440px"}}>
            {posts.map(item => (
                <div key={item.id}>
                  <div className='PostList__container'>
                      <img src={`http://127.0.0.1:8000${item.images}`} alt="фото" className='PostList__img'/>
                      <h3 className='PostList__title'>{item.title}</h3>
                      <p className='PostList__desc'>{item.description}</p>
                  </div>
                  <button onClick={() => navigateEdit(item.id)}>Редактировать</button>
                  <button onClick={() => deletePost(item.id)}>Удалить</button>
                </div>
            ))}
        </div>
        </>
    );
    }

export default MyProfile;