const prisma = require('../prismaClient');

exports.getMetrics = async (req, res) => {
  try {
    const [totalPosts, totalIssues, upcomingEvents, totalRecommendations] = await Promise.all([
      prisma.post.count(),
      prisma.issue.count(),
      prisma.event.count({ where: { eventDate: { gte: new Date() } } }),
      prisma.recommendation.count()
    ]);

    const communityActivity = totalPosts + totalIssues + upcomingEvents + totalRecommendations;

    res.json({
      totalPosts,
      totalIssues,
      upcomingEvents,
      totalRecommendations,
      communityActivity
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
};

  
