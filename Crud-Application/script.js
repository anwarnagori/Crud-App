const apiURL = "https://66fcf615c3a184a84d1887f7.mockapi.io/api/v1/Post";

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
                            <button class="edit-btn" id="edit-btn">Edit</button>
                            <button class="delete-btn" id="delete-btn" onclick="${deletePost(1)}">Delete</button>
                        </div>
                        `

        postsParentDiv.appendChild(postDiv)
    });
}


// =======Create Post=============

document.getElementById('createPostForm').addEventListener('submit', function (e) {
    e.preventDefault()

    const name = document.getElementById('name').value
    const title = document.getElementById('title').value
    const avatar = document.getElementById('avatar').value
    const body = document.getElementById('body').value

    const newPost = {
        name,
        title,
        avatar,
        body,
        createdAt: new Date().toISOString()
    }

    console.log(newPost)

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

function deletePost() {
    document.getElementById("delete-btn").addEventListener('click', function () {
post.removeChild(postsParentDiv);    
    })
}