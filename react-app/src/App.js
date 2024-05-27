import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [comments, setComments] = useState('');
  const newCommentRef = useRef(null);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = () => {
    fetch('http://localhost:8080/comments')
      .then(res => res.text())
      .then(setComments); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = newCommentRef.current.value;

    fetch('http://localhost:8080/add-comments?comment=' + encodeURIComponent(newComment))
      .then(res => res.text())
      .then(setComments); 
  };

  return (
    <div>
      <h1>Comments</h1>
      <div dangerouslySetInnerHTML={{ __html: comments }} />

      <form onSubmit={handleSubmit}>
        <input type="text" ref={newCommentRef} />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
}

export default App;
