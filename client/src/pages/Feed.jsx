import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import { createPost, getPosts } from '../services/api';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');

  const refreshPosts = async () => {
    const { data } = await getPosts();
    setPosts(data);
  };

  useEffect(() => {
    let active = true;
    getPosts()
      .then(({ data }) => {
        if (active) setPosts(data);
      })
      .catch((error) => console.error(error));
    return () => { active = false; };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!content.trim()) return;
    try {
      await createPost(content);
      setContent('');
      await refreshPosts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="page-title">Neighborhood Feed</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <textarea className="input-field" placeholder="What's happening in the neighborhood?" value={content} onChange={(event) => setContent(event.target.value)} rows="3" />
          </div>
          <button type="submit" className="btn-primary">Post update</button>
        </form>
      </div>
      <div>
        {posts.map((post) => <PostCard key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default Feed;

  
