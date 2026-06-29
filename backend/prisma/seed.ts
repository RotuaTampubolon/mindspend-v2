import { PrismaClient, CategoryType } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config();

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL as string,
});

const prisma = new PrismaClient({ adapter });

const defaultCategories = [
  // EXPENSE
  { name: 'Makanan & Minuman', icon: 'food',      color: '#F59E0B', type: CategoryType.EXPENSE },
  { name: 'Transportasi',      icon: 'transport',  color: '#3B82F6', type: CategoryType.EXPENSE },
  { name: 'Kos / Sewa',        icon: 'home',       color: '#8B5CF6', type: CategoryType.EXPENSE },
  { name: 'Kesehatan',         icon: 'health',     color: '#EF4444', type: CategoryType.EXPENSE },
  { name: 'Belanja',           icon: 'shopping',   color: '#EC4899', type: CategoryType.EXPENSE },
  { name: 'Hiburan',           icon: 'fun',        color: '#06B6D4', type: CategoryType.EXPENSE },
  { name: 'Pendidikan',        icon: 'education',  color: '#10B981', type: CategoryType.EXPENSE },
  { name: 'Tagihan',           icon: 'bills',      color: '#6B7280', type: CategoryType.EXPENSE },
  { name: 'Lainnya',           icon: 'other',      color: '#9CA3AF', type: CategoryType.EXPENSE },

  // INCOME
  { name: 'Uang Saku',         icon: 'allowance',  color: '#4CAF7D', type: CategoryType.INCOME },
  { name: 'Freelance',         icon: 'freelance',  color: '#7C6FF7', type: CategoryType.INCOME },
  { name: 'Beasiswa',          icon: 'scholarship',color: '#F59E0B', type: CategoryType.INCOME },
  { name: 'Pendapatan Lain',   icon: 'other',      color: '#10B981', type: CategoryType.INCOME },
];

async function main() {
  console.log('Seeding default categories...');

  for (const cat of defaultCategories) {
    const id = `system-${cat.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;

    await prisma.category.upsert({
      where: { id },
      update: cat,
      create: {
        id,
        ...cat,
        userId: null,
      },
    });
  }

  console.log(`Seeded ${defaultCategories.length} default categories`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });