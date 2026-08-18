import { useEffect, useState } from 'react';
import { getMetrics } from '../services/api';

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    totalPosts: 0,
    totalIssues: 0,
    upcomingEvents: 0,
    totalRecommendations: 0,
    communityActivity: 0
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const { data } = await getMetrics();
        setMetrics(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMetrics();
  }, []);

  return (
    <div>
      <div className="hero-section" style={{ marginBottom: '3rem' }}>
        <h1 className="page-title" style={{ marginBottom: '0.5rem' }}>Welcome to LocalConnect</h1>
        <p className="card-description" style={{ fontSize: '1.2rem' }}>A lightweight digital space for neighbors to share updates, solve local problems, and make plans together.</p>
      </div>

      <div className="card">
        <h2 className="card-title" style={{ marginBottom: '1.5rem' }}>Community Activity Overview</h2>
        <div className="metrics-grid">
          <div className="metric-card">
            <span className="metric-value">{metrics.totalPosts}</span>
            <span className="metric-label">Neighborhood Updates</span>
          </div>
          <div className="metric-card">
            <span className="metric-value">{metrics.totalIssues}</span>
            <span className="metric-label">Issues Reported</span>
          </div>
          <div className="metric-card">
            <span className="metric-value">{metrics.upcomingEvents}</span>
            <span className="metric-label">Upcoming Events</span>
          </div>
          <div className="metric-card">
            <span className="metric-value">{metrics.totalRecommendations}</span>
            <span className="metric-label">Local Recommendations</span>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">Built for neighbors</h2>
        <p className="card-description">LocalConnect now prioritizes the everyday interactions that help a neighborhood feel informed and connected: reporting issues, organizing activities, and sharing trusted local knowledge.</p>
        <div className="activity-highlight">
          <strong>{metrics.communityActivity}</strong>
          <span>community contributions tracked</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

  
