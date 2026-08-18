const prisma = require('../prismaClient');

exports.getEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: { eventDate: 'asc' }
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch community events' });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const { title, description, location, eventDate } = req.body;
    if (!title?.trim() || !location?.trim() || !eventDate) {
      return res.status(400).json({ error: 'Title, location, and event date are required' });
    }

    const event = await prisma.event.create({
      data: {
        title: title.trim(),
        description: description?.trim() || '',
        location: location.trim(),
        eventDate: new Date(eventDate)
      }
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create community event' });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    await prisma.event.delete({ where: { id: Number(req.params.id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove community event' });
  }
};

module.exports = exports;

  
