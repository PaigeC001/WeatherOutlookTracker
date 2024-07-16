const form = document.getElementById('blogPostForm');

// Instead of the existing code that handles form submission, replace it with the following:

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const post = {
    title: form.title.value,
    content: form.content.value
  };

  let existingPosts = JSON.parse(localStorage.getItem('posts')) || [];

  existingPosts.push(post);

  localStorage.setItem('posts', JSON.stringify(existingPosts));

  window.location.reload();

const form = document.getElementById('blog-form');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const post = {
    title: form.title.value,
    content: form.content.value
  };

  let existingPosts = JSON.parse(localStorage.getItem('posts')) || [];

  existingPosts.push(post);

  localStorage.setItem('posts', JSON.stringify(existingPosts));

  // Generate the URL for the next page dynamically based on the current page URL
  const currentPageUrl = window.location.href;
  const nextPageNumber = 2; // Specify the correct page number here
  const nextPageUrl = currentPageUrl + '?page=' + nextPageNumber;

  window.location.href = http://127.0.0.1:5500/Challenge-4/blog.html;
});
});

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  console.log('Username:', username);
  console.log('Title:', title);
  console.log('Content:', content);

const toggle = document.getElementById('toggle');
const body = document.body;

toggle.addEventListener('change', function() {
  body.classList.toggle('dark-mode');
});
});

const toggle = document.getElementById('toggle');
const body = document.body;

toggle.addEventListener('change', function() {
    body.classList.toggle('dark-mode');
});

