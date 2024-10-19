import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  return (
    <div>
      {posts.map(post => (
        <div key={post.id} className="border p-4 m-2">
          <h2 className="text-xl">{post.title}</h2>
          <p>{post.content}</p>
          <span>Author: {post.author}</span>
          {/* Link to view individual post */}
          <Link to={`/posts/${post.id}`} className="text-blue-500 underline">View Post</Link>
        </div>
      ))}
    </div>
  );
};

export default PostList;
