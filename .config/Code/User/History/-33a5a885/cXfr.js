const form = document.querySelector('form');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  console.log('Username:', username);
  console.log('Title:', title);
  console.log('Content:', content);

// ... existing code ...

const toggle = document.getElementById('toggle');
const body = document.body;

toggle.addEventListener('change', function() {
  body.classList.toggle('dark-mode');
});
});