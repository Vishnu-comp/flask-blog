import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PostDetail = () => {
  const { postId } = useParams();  // Get the post ID from the URL
  const navigate = useNavigate(); // For navigation
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/posts/${postId}`)
      .then(response => setPost(response.data))
      .catch(error => setError('Post not found'));
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:5000/posts/${postId}`);
      alert('Post deleted successfully');
      navigate('/'); // Navigate back to the home page
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!post) {
    return <div>Loading post...</div>;
  }

  return (
    <div className="border p-4 m-2">
      <h2 className="text-xl">{post.title}</h2>
      <p>{post.content}</p>
      <span>Author: {post.author}</span>
      <div className="mt-4">
        <button className="bg-yellow-500 text-white p-2 mr-2" onClick={() => navigate(`/edit/${post.id}`)}>Edit</button>
        <button className="bg-red-500 text-white p-2" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default PostDetail;
