// EditPost.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/posts/${postId}`);
        setTitle(response.data.title);
        setContent(response.data.content);
        setAuthor(response.data.author);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://127.0.0.1:5000/posts/${postId}`, { title, content, author });
      console.log('Post updated:', response.data);
      navigate(`/posts/${postId}`); // Redirect to the post detail page
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="p-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border p-2 m-2"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        className="border p-2 m-2"
      />
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
        className="border p-2 m-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">Update Post</button>
    </form>
  );
};

export default EditPost;
