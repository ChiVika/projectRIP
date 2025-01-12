// src/components/PostList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./PostList.css";

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return (
    <div className='PostList'>
      {posts.map(item => (
            <div  key={item.id}>
              <div className='PostList__container'>
                <img src={`http://127.0.0.1:8000${item.images}`} alt="фото" className='PostList__img'/>
                <h3 className='PostList__title'>{item.title}</h3>
                <p className='PostList__desc'>{item.description}</p>
              </div>
              
            </div>
          ))}
    </div>
  );
}

export default PostList;
