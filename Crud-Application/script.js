const apiURL = 'https://66fcf615c3a184a84d1887f7.mockapi.io/api/v1/Post'

function fetchPosts() {
    fetch(apiURL)
        .then(response => response.json())
        .then(data => displayData(data))
        .catch(error => console.log('error', error))
}
fetchPosts();

function displayData(posts) {
    const postsParentDiv = document.getElementById('posts');
    postsParentDiv.innerHTML = '';
    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');

        postDiv.innerHTML = `
                        <div class="post-header">
                            <img src="${post.avatar}" alt="Avatar">
                            <div>
                                <h3>${post.name}</h3>
                                <small>${post.createdAt}</small>
                            </div>
                        </div>
                        <h3>${post.title}</h3>
                        <p>${post.body}</p>
                        <div class="actions">
                            <button class="edit-btn" onclick="editPost(${post.id})">Edit</button>
                            <button class="delete-btn" onclick="deletePost(${post.id})">Delete</button>
                        </div>
                        `

        postsParentDiv.appendChild(postDiv);
    });
}


// =======Create Post=============

document.getElementById('createPostForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const title = document.getElementById('title').value;
    const avatar = document.getElementById('avatar').value;
    const body = document.getElementById('body').value;

    const newPost = {
        name: name,
        title: title,
        avatar: avatar,
        body: body,
        createdAt: new Date().toISOString()
    }

    fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))

})

function deletePost(id) {
    fetch(`${apiURL}/${id}`, {
        method: 'DELETE',
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
    }).then(data => {
        alert(`${data.name} successfully deleted`);
        fetchPosts();
    }).catch(error => console.log(error));
}

function editPost(id) {
    fetch(`${apiURL}/${id}`, {
        method: 'PUT',
    }).then(response => response.json())
        .then(data => {
            document.getElementById("create-post").style.display = 'none';
            document.getElementById("update-post").style.display = 'block';

            document.getElementById("update-name").value = data.name;
            document.getElementById("update-title").value = data.title;
            document.getElementById("update-avatar").value = data.avatar;
            document.getElementById("update-body").value = data.body;

            document.getElementById("updatePostForm").addEventListener('submit', function (e) {
                e.preventDefault();

                const name = document.getElementById('update-name').value;
                const title = document.getElementById('update-title').value;
                const avatar = document.getElementById('update-avatar').value;
                const body = document.getElementById('update-body').value;

                const updatePost = {
                    name: name,
                    title: title,
                    avatar: avatar,
                    body: body,
                    createdAt: new Date().toISOString()
                }
                fetch(`${apiURL}/${id}`, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(updatePost)
                }).then(response => response.json())
                    .then(data => {
                        alert(`${data.name} successfully updated`);
                        fetchPosts();
                        document.getElementById("create-post").style.display = 'block';
                        document.getElementById("update-post").style.display = 'none';
                    }).catch(error => console.log(error));
            })
        })
        .catch(error => console.log(error));
}