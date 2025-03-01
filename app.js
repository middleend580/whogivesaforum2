// Fetch all posts from the server when the page loads
window.onload = () => {
    fetchPosts();
};

// Function to fetch posts from the server
function fetchPosts() {
    fetch('/posts')
        .then(response => response.json())
        .then(data => {
            const postList = document.getElementById('postList');
            postList.innerHTML = '';
            data.forEach(post => {
                const postDiv = document.createElement('div');
                postDiv.classList.add('post');
                postDiv.innerText = post.content;
                postList.appendChild(postDiv);
            });
        });
}

// Function to submit a new post
function submitPost() {
    const postContent = document.getElementById('postContent').value;

    if (postContent.trim() === '') {
        alert("Post content can't be empty!");
        return;
    }

    fetch('/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: postContent }),
    })
    .then(response => response.json())
    .then(() => {
        document.getElementById('postContent').value = '';  // Clear the textarea
        fetchPosts();  // Refresh the posts
    });
}
