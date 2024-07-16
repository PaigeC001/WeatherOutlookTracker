const form = document.querySelector('form');

// ... Existing code ...

// Find the section of your code that handles form submission
const form = document.getElementById('blog-form');

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
});

// ... Continue with the rest of your code ...

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

