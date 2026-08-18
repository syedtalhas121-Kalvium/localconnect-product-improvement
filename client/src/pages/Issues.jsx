import { useEffect, useState } from 'react';
import IssueCard from '../components/IssueCard';
import { createIssue, getIssues, updateIssue } from '../services/api';

const Issues = () => {
  const [issues, setIssues] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const refreshIssues = async () => {
    const { data } = await getIssues();
    setIssues(data);
  };

  useEffect(() => {
    let active = true;
    getIssues()
      .then(({ data }) => {
        if (active) setIssues(data);
      })
      .catch((error) => console.error(error));
    return () => { active = false; };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title.trim()) return;
    try {
      await createIssue(title, description);
      setTitle('');
      setDescription('');
      await refreshIssues();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateIssue(id, status);
      await refreshIssues();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="page-title">Local Issues</h1>
      <div className="card">
        <h2 className="card-title" style={{ marginBottom: '1rem' }}>Report an issue</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input className="input-field" placeholder="Issue title" value={title} onChange={(event) => setTitle(event.target.value)} style={{ marginBottom: '0.5rem' }} />
            <textarea className="input-field" placeholder="Description" value={description} onChange={(event) => setDescription(event.target.value)} rows="2" />
          </div>
          <button type="submit" className="btn-primary">Submit issue</button>
        </form>
      </div>
      <div className="grid">
        {issues.map((issue) => <IssueCard key={issue.id} issue={issue} onUpdateStatus={handleUpdateStatus} />)}
      </div>
    </div>
  );
};

export default Issues;

  
