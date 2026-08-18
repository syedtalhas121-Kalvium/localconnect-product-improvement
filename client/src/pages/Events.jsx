import { useEffect, useState } from 'react';
import { CalendarDays, MapPin, Trash2 } from 'lucide-react';
import { createEvent, deleteEvent, getEvents } from '../services/api';

const formatEventDate = (value) => new Intl.DateTimeFormat(undefined, {
  weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
}).format(new Date(value));

const Events = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', location: '', eventDate: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    getEvents()
      .then(({ data }) => { if (active) setEvents(data); })
      .catch(() => { if (active) setError('Events are temporarily unavailable. Please try again.'); });
    return () => { active = false; };
  }, []);

  const refreshEvents = async () => {
    const { data } = await getEvents();
    setEvents(data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.title.trim() || !form.location.trim() || !form.eventDate) return;
    try {
      await createEvent(form);
      setForm({ title: '', description: '', location: '', eventDate: '' });
      setError('');
      await refreshEvents();
    } catch {
      setError('Could not publish this event. Please check the details and try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEvent(id);
      setEvents((currentEvents) => currentEvents.filter((item) => item.id !== id));
    } catch {
      setError('Could not remove this event.');
    }
  };

  return (
    <div>
      <h1 className="page-title">Community Events</h1>
      <p className="page-intro">Make it easy for neighbors to find cleanups, gatherings, and local activities.</p>
      <div className="card">
        <h2 className="card-title">Share an upcoming event</h2>
        <form onSubmit={handleSubmit} className="event-form">
          <input className="input-field" placeholder="Event title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <input className="input-field" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
          <input className="input-field" type="datetime-local" value={form.eventDate} onChange={(e) => setForm({ ...form, eventDate: e.target.value })} required />
          <textarea className="input-field" placeholder="What should neighbors know?" rows="3" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <button type="submit" className="btn-primary">Publish event</button>
        </form>
        {error && <p className="form-error" role="alert">{error}</p>}
      </div>
      <div className="grid">
        {events.length === 0 && <div className="card empty-state">No events yet. Be the first neighbor to organize one.</div>}
        {events.map((item) => (
          <article className="card event-card" key={item.id}>
            <div className="card-header">
              <span className="user-badge"><CalendarDays size={14} /> Event</span>
              <button className="icon-button" onClick={() => handleDelete(item.id)} aria-label={`Remove ${item.title}`} title="Remove event"><Trash2 size={17} /></button>
            </div>
            <h2 className="card-title">{item.title}</h2>
            <p className="event-meta"><CalendarDays size={16} /> {formatEventDate(item.eventDate)}</p>
            <p className="event-meta"><MapPin size={16} /> {item.location}</p>
            {item.description && <p className="card-description">{item.description}</p>}
          </article>
        ))}
      </div>
    </div>
  );
};

export default Events;

  
