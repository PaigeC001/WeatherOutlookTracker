const previousBlogPosts = [
  {
    username: 'John Doe',
    title: 'First Blog Post',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    username: 'Jane Smith',
    title: 'Second Blog Post',
    content: 'Ut commodo semper diam in viverra. Fusce bibendum, lectus sit amet efficitur imperdiet.'
  }
];

function displayBlogPosts() {
  const blogPostsDiv = document.getElementById('blogPosts');

  previousBlogPosts.forEach(function(post) {
    const postDiv = document.createElement('div');
    postDiv.innerHTML = 
      <><h3>${post.title}</h3><p>By ${post.username}</p><p>${post.content}</p></>
    ;
    blogPostsDiv.appendChild(postDiv);
  });
}

window.addEventListener('load', displayBlogPosts);
