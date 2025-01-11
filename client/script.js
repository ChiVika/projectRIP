document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('posts-container');
    const postForm = document.getElementById('post-form');
    const postTitle = document.getElementById('title');
    const postBody = document.getElementById('body');

    const apiUrl = 'http://localhost:8000/api/posts/';

    async function loadPosts() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const posts = await response.json();
            displayPosts(posts);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    function displayPosts(posts) {
        postsContainer.innerHTML = '';
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.body}</p>
                <button class="btn btn-danger" onclick="deletePost(${post.id})">Delete</button>
                <button class="btn btn-warning" onclick="editPost(${post.id})">Edit</button>
            `;
            postsContainer.appendChild(postElement);
        });
    }

    postForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const newPost = {
            title: postTitle.value,
            body: postBody.value
        };
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPost)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const createdPost = await response.json();
            loadPosts();
            postTitle.value = '';
            postBody.value = '';
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    });

    window.deletePost = async (id) => {
        try {
            const response = await fetch(`${apiUrl}${id}/`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            loadPosts();
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    window.editPost = async (id) => {
        try {
            const response = await fetch(`${apiUrl}${id}/`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const post = await response.json();
            postTitle.value = post.title;
            postBody.value = post.body;
            postForm.dataset.id = id;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    postForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const id = postForm.dataset.id;
        const updatedPost = {
            title: postTitle.value,
            body: postBody.value
        };
        try {
            const response = await fetch(`${apiUrl}${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedPost)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const updatedPostData = await response.json();
            loadPosts();
            postTitle.value = '';
            postBody.value = '';
            postForm.dataset.id = '';
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    });

    loadPosts();
});
