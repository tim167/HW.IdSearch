document.addEventListener('DOMContentLoaded', () => {
  const postIdInput = document.getElementById('postIdInput');
  const searchButton = document.getElementById('searchButton');

  searchButton.addEventListener('click', () => {
    const postId = parseInt(postIdInput.value);

    if (!isNaN(postId) && postId >= 1 && postId <= 100) {
      fetchPost(postId)
        .then(post => {
          displayPost(post);
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      console.error('Некоректний ID поста.');
    }
  });
});

function fetchPost(postId) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Пост не знайдено.');
      }
    });
}

function fetchComments(postId) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Коментарі не знайдено.');
      }
    });
}

function displayPost(post) {
  const postContainer = document.getElementById('postContainer');
  postContainer.innerHTML = `
    <div>
      <h2>${post.title}</h2>
      <p>${post.body}</p>
      <button id="commentsButton">Отримати коментарі</button>
    </div>
  `;

  const commentsButton = document.getElementById('commentsButton');
  commentsButton.addEventListener('click', () => {
    const postId = post.id;
    fetchComments(postId)
      .then(comments => {
        displayComments(comments);
      })
      .catch(error => {
        console.error(error);
      });
  });
}

function displayComments(comments) {
  const postContainer = document.getElementById('postContainer');
  const commentsList = document.createElement('ul');
  comments.forEach(comment => {
    const listItem = document.createElement('li');
    listItem.textContent = comment.body;
    commentsList.appendChild(listItem);
  });
  postContainer.appendChild(commentsList);
}