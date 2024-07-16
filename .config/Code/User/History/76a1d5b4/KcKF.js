function submitForm(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  if (username.trim() === '' || title.trim() === '' || content.trim() === '') {
    alert('Please complete all fields');
    return;
  }

  const post = {
    username: username,
    title: title,
    content: content
  };

  let posts = localStorage.getItem('posts');
  if (posts) {
    posts = JSON.parse(posts);
    posts.push(post);
  } else {
    posts = [post];
  }

  localStorage.setItem('posts', JSON.stringify(posts));

  document.getElementById('blog-form').reset();

  window.location.href = 'posts.html';
}

function toggleMode() {
  const body = document.body;
  body.classList.toggle('dark-mode');
}

function goBack() {
  window.location.href = 'index.html';
}

function loadPosts() {
  const postList = document.getElementById('post-list');

  let posts = localStorage.getItem('posts');
  if (posts) {
    posts = JSON.parse(posts);

    posts.forEach(post => {
      const li = document.createElement('li');
      li.innerHTML = <><h2>${post.title}</h2><p><strong>Author:</strong> ${post.username}</p><p>${post.content}</p></>;
      postList.appendChild(li);
    });
  }
}

loadPosts();