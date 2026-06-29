import prisma from '../utils/prisma';

export const getCategoriesService = async (userId: string) => {
  const categories = await prisma.category.findMany({
    where: {
      OR: [
        { userId: null },   // system categories
        { userId },         // user custom categories
      ],
    },
    orderBy: [
      { type: 'asc' },
      { name: 'asc' },
    ],
  });

  return categories;
};