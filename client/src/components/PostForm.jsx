// src/components/PostForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

function PostForm() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   axios.post('http://127.0.0.1:8000/api/posts/', { title, body })
  //     .then(response => {
  //       console.log('Post created:', response.data);
  //       setTitle('');
  //       setBody('');
  //     })
  //     .catch(error => {
  //       console.error('Error creating post:', error);
  //     });
  // };

  
  return;
}

export default PostForm;
