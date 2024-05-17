import prisma from '../../../shared/prisma';
import { IBlockDate } from './blockDate.type';

const createBlockDate = async (payload: IBlockDate) => {
  const result = await prisma.blockDate.create({
    data: {
      date: payload.date,
    },
  });
};

const getBlockDate = async () => {
  const result = await prisma.blockDate.findMany({});
  return result;
};

// update block
const updateBlockDate = async (id: string, payload: IBlockDate) => {
  const result = await prisma.blockDate.findUnique({
    where: {
      id: id,
    },
    select: {
      date: true,
    },
  });
  if (!result) {
    throw new Error('Block not found');
  }
  const updateDate = [...result.date, ...payload.date];
  const data = await prisma.blockDate.update({
    where: {
      id: id,
    },
    data: {
      date: updateDate,
    },
  });
};

export const blockDateService = {
  createBlockDate,
  getBlockDate,
  updateBlockDate,
};
