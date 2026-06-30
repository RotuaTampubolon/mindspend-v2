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
  { name: 'Food',          icon: 'food',          color: '#F59E0B', type: CategoryType.EXPENSE },
  { name: 'Transport',     icon: 'transport',     color: '#3B82F6', type: CategoryType.EXPENSE },
  { name: 'Shopping',      icon: 'shopping',      color: '#EC4899', type: CategoryType.EXPENSE },
  { name: 'Entertainment', icon: 'entertainment', color: '#06B6D4', type: CategoryType.EXPENSE },
  { name: 'Kuliah',        icon: 'education',     color: '#10B981', type: CategoryType.EXPENSE },
  { name: 'Others',        icon: 'other',         color: '#9CA3AF', type: CategoryType.EXPENSE },

  // INCOME
  { name: 'Kiriman Bulanan', icon: 'allowance', color: '#4CAF7D', type: CategoryType.INCOME },
  { name: 'Freelance',       icon: 'freelance', color: '#7C6FF7', type: CategoryType.INCOME },
  { name: 'Bonus',           icon: 'bonus',     color: '#F59E0B', type: CategoryType.INCOME },
  { name: 'Cashback',        icon: 'cashback',  color: '#10B981', type: CategoryType.INCOME },
  { name: 'Others',          icon: 'other',     color: '#9CA3AF', type: CategoryType.INCOME },
];                         

async function main() {
  console.log('Seeding default categories...');

  // Hapus semua system categories lama (userId: null)
  // onDelete: SetNull di schema akan otomatis nullify categoryId
  // di transaksi manapun yang masih nunjuk ke kategori ini
  const deleted = await prisma.category.deleteMany({
    where: { userId: null },
  });
  console.log(`Removed ${deleted.count} old system categories`);

  console.log('Seeding new categories from Figma design...');

  for (const cat of defaultCategories) {
    const id = `system-${cat.type.toLowerCase()}-${cat.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;

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