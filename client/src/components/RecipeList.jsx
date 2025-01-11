// src/components/PostList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/posts/')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return (
    <div>
      <h2>Список постов</h2>
      {posts.map(item => (
            <div key={item.id}>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          ))}
      
      {/* {posts.map(post => (
        <div key={post.id}>
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </div>
      ))} */}
    </div>
  );
}

export default PostList;
