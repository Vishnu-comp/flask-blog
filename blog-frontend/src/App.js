// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import PostDetail from './components/PostDetail';
import EditPost from './components/EditPost'; // Import EditPost

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Blog App</h1>

        <Routes>
          <Route path="/" element={
            <>
              <CreatePost />
              <PostList />
            </>
          } />
          <Route path="/posts/:postId" element={<PostDetail />} />
          <Route path="/edit/:postId" element={<EditPost />} /> {/* Add edit route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
