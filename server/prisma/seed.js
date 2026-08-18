const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding data...');

  await prisma.post.createMany({
    data: [
      { content: 'Garage sale announcement - This Saturday at 123 Maple St!' },
      { content: 'Lost dog notice - Golden Retriever named "Buddy" last seen near the park.' },
      { content: 'Community meeting - Tuesday at 7 PM in the community center.' }
    ]
  });

  await prisma.issue.createMany({
    data: [
      { title: 'Broken streetlight', description: 'Corner of 4th and Oak is pitch black.' },
      { title: 'Garbage overflow', description: "Park bins haven't been emptied in a week." }
    ]
  });

  await prisma.event.createMany({
    data: [
      {
        title: 'Saturday park cleanup',
        description: 'Bring gloves and help keep our shared green space welcoming.',
        location: 'Maple Street Park',
        eventDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      },
      {
        title: 'Neighborhood potluck',
        description: 'A casual evening to meet neighbors and share favorite dishes.',
        location: 'Community Center',
        eventDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
      }
    ]
  });

  await prisma.recommendation.createMany({
    data: [
      {
        name: 'Green Leaf Repairs',
        category: 'Home repair',
        description: 'Friendly, reliable handyman service recommended by several neighbors.'
      },
      {
        name: 'Maple Corner Bakery',
        category: 'Food and drink',
        description: 'Great fresh bread and a quiet spot for a weekend coffee.'
      }
    ]
  });

  console.log('Seeding completed!');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

  
