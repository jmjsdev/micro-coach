import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create demo user
  const hashedPassword = await bcrypt.hash('password123', 10);

  const user = await prisma.user.upsert({
    where: { email: 'demo@microcoach.app' },
    update: {},
    create: {
      email: 'demo@microcoach.app',
      password: hashedPassword,
      name: 'Demo User',
      totalPoints: 250,
      level: 3,
    },
  });

  console.log('✅ Created demo user:', user.email);

  // Create sample habits
  const habits = await Promise.all([
    prisma.habit.create({
      data: {
        userId: user.id,
        name: 'Méditation quotidienne',
        description: '10 minutes de méditation chaque matin',
        category: 'mental',
        frequency: 'daily',
        icon: '🧘',
        color: '#8b5cf6',
        goalDays: 30,
      },
    }),
    prisma.habit.create({
      data: {
        userId: user.id,
        name: 'Exercice physique',
        description: '30 minutes d\'exercice',
        category: 'fitness',
        frequency: 'weekly',
        daysPerWeek: 3,
        icon: '💪',
        color: '#f97316',
        goalDays: 90,
      },
    }),
    prisma.habit.create({
      data: {
        userId: user.id,
        name: 'Lecture',
        description: 'Lire 20 pages par jour',
        category: 'productivity',
        frequency: 'daily',
        icon: '📚',
        color: '#3b82f6',
        goalDays: 100,
      },
    }),
  ]);

  console.log('✅ Created', habits.length, 'sample habits');

  // Create some check-ins
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    for (const habit of habits) {
      await prisma.checkIn.create({
        data: {
          userId: user.id,
          habitId: habit.id,
          date,
          completed: true,
          mood: Math.floor(Math.random() * 5) + 1,
        },
      });
    }
  }

  console.log('✅ Created sample check-ins for the last 7 days');

  // Create achievements
  await prisma.achievement.create({
    data: {
      userId: user.id,
      type: 'first_habit',
      habitId: habits[0].id,
    },
  });

  await prisma.achievement.create({
    data: {
      userId: user.id,
      type: 'streak_7',
      habitId: habits[0].id,
    },
  });

  console.log('✅ Created sample achievements');

  console.log('🎉 Seeding completed!');
  console.log('\n📧 Demo account:');
  console.log('   Email: demo@microcoach.app');
  console.log('   Password: password123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
