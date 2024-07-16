const form = document.querySelector('form');

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

// Set up local storage
localStorage.setItem('blogPosts', JSON.stringify([]));

// Add a new blog post to the local storage
function addBlogPost(username, title, content) {
  // Retrieve existing blog posts from local storage
  var storedData = localStorage.getItem('blogPosts');
  var blogPostsArray = JSON.parse(storedData);

  // Create a new blog post object
  var newBlogPost = {
    username: username,
    title: title,
    content: content
  };

  // Add the new blog post to the array
  blogPostsArray.push(newBlogPost);

  // Update the local storage with the updated array
  localStorage.setItem('blogPosts', JSON.stringify(blogPostsArray));
}

// Retrieve all blog posts from local storage
function getAllBlogPosts() {
  var storedData = localStorage.getItem('blogPosts');
  return JSON.parse(storedData);
}

// Retrieve a single blog entry by its index
function getBlogPost(index) {
  var blogPostsArray = getAllBlogPosts();
  return blogPostsArray[index];
}

// Example usage
addBlogPost("JohnDoe", "My first blog post", "This is the content of my first blog post");
addBlogPost("JaneSmith", "My second blog post", "This is the content of my second blog post");

console.log(getAllBlogPosts());
console.log(getBlogPost(0));

// Add a new blog post and redirect to the second HTML page
function addBlogPostAndRedirect(username, title, content) {
    // Add the blog post using the existing addBlogPost function
    addBlogPost(username, title, content);
  
    // Redirect to the second HTML page
    window.location.href = "blog-script.html";
  }