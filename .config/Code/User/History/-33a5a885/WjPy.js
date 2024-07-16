const form = document.getElementById('blogPostForm');


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

var blogPosts = [
  { title: "First Blog Post", content: "This is the content of the first blog post." },
  { title: "Second Blog Post", content: "This is the content of the second blog post." }
];

localStorage.setItem('blogPosts', JSON.stringify(blogPosts));