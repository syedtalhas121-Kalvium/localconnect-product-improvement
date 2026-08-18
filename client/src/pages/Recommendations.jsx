import { useEffect, useState } from 'react';
import { MapPinned, Star } from 'lucide-react';
import { createRecommendation, getRecommendations } from '../services/api';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [form, setForm] = useState({ name: '', category: '', description: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    getRecommendations()
      .then(({ data }) => { if (active) setRecommendations(data); })
      .catch(() => { if (active) setError('Recommendations are temporarily unavailable. Please try again.'); });
    return () => { active = false; };
  }, []);

  const refreshRecommendations = async () => {
    const { data } = await getRecommendations();
    setRecommendations(data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.category.trim() || !form.description.trim()) return;
    try {
      await createRecommendation(form);
      setForm({ name: '', category: '', description: '' });
      setError('');
      await refreshRecommendations();
    } catch {
      setError('Could not share this recommendation. Please try again.');
    }
  };

  return (
    <div>
      <h1 className="page-title">Local Recommendations</h1>
      <p className="page-intro">Help your neighbors find trusted services, shops, and people close to home.</p>
      <div className="card">
        <h2 className="card-title">Recommend a local service</h2>
        <form onSubmit={handleSubmit} className="event-form">
          <input className="input-field" placeholder="Business or service name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input className="input-field" placeholder="Category (for example: plumber)" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
          <textarea className="input-field" placeholder="Why do you recommend them?" rows="3" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
          <button type="submit" className="btn-primary">Share recommendation</button>
        </form>
        {error && <p className="form-error" role="alert">{error}</p>}
      </div>
      <div className="grid">
        {recommendations.length === 0 && <div className="card empty-state">No recommendations yet. Share a trusted local find with the community.</div>}
        {recommendations.map((item) => (
          <article className="card recommendation-card" key={item.id}>
            <div className="card-header">
              <span className="user-badge"><Star size={14} /> {item.category}</span>
              <MapPinned size={18} className="muted-icon" />
            </div>
            <h2 className="card-title">{item.name}</h2>
            <p className="card-description">{item.description}</p>
            <span className="timestamp">Shared {new Date(item.createdAt).toLocaleDateString()}</span>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;

  
