const prisma = require('../prismaClient');

exports.getRecommendations = async (req, res) => {
  try {
    const recommendations = await prisma.recommendation.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch local recommendations' });
  }
};

exports.createRecommendation = async (req, res) => {
  try {
    const { name, category, description } = req.body;
    if (!name?.trim() || !category?.trim() || !description?.trim()) {
      return res.status(400).json({ error: 'Name, category, and description are required' });
    }

    const recommendation = await prisma.recommendation.create({
      data: {
        name: name.trim(),
        category: category.trim(),
        description: description.trim()
      }
    });
    res.status(201).json(recommendation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create local recommendation' });
  }
};

module.exports = exports;

  
