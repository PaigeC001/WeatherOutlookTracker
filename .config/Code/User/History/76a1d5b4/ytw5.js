// script.js
document.addEventListener('DOMContentLoaded', function() {
  const landingPage = document.getElementById('landing-page');
  const postsPage = document.getElementById('posts-page');
  const blogForm = document.getElementById('blog-form');
  const blogPosts = document.getElementById('blog-posts');
  const modeToggle = document.getElementById('mode');
  const backButton = document.getElementById('back-button');

  blogForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    if (username === '' || title === '' || content === '') {
      alert('Please complete the form');
    } else {
      const post = {
        username: username,
        title: title,
        content: content
      };

      let posts = JSON.parse(localStorage.getItem('posts')) || [];
      posts.push(post);
      localStorage.setItem('posts', JSON.stringify(posts));

      blogForm.reset();
      navigateToPostsPage();
    }
  });

  modeToggle.addEventListener('change', function() {
    if (modeToggle.checked) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  });

  backButton.addEventListener('click', function() {
    navigateToLandingPage();
  });

  function navigateToLandingPage() {
    landingPage.style.display = 'block';
    postsPage.style.display = 'none';
  }

  function navigateToPostsPage() {
    landingPage.style.display = 'none';
    postsPage.style.display = 'block';
    renderPosts();
  }

  function renderPosts() {
    blogPosts.innerHTML = '';
    let posts = JSON.parse(localStorage.getItem('posts')) || [];

    posts.forEach(function(post, index) {
      const listItem = document.createElement('li');
      listItem.innerHTML = 
        <><h3>${post.title}</h3><p>By <strong>${post.username}</strong></p><p>${post.content}</p><button class="post-info" data-index="${index}">More Info</button></>
      ;
      blogPosts.appendChild(listItem);
    });

    const postInfoButtons = document.querySelectorAll('.post-info');
    postInfoButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        const index = button.getAttribute('data-index');
        showPostDetails(index);
      });
    });
  }

  function showPostDetails(index) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const post = posts[index];

    alert(
      Title: ${post.title}
      Content: ${post.content}
      Author: ${post.username}