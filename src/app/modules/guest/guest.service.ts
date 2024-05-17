import prisma from '../../../shared/prisma';
import { IGuest } from './guest.interface';

const createGuest = async (payload: IGuest) => {
  const isGuestExists = await prisma.guest.findFirst({
    where: {
      name: payload.name,
    },
  });
  if (isGuestExists) {
    throw new Error('Guest already exists');
  }
  const newGuest = await prisma.guest.create({
    data: payload,
  });
  if (!newGuest) {
    throw new Error('Guest not created');
  }
  return newGuest;
};

// list of guests
const getGuests = async () => {
  const guests = await prisma.guest.findMany();
  return guests;
};

// update guest
const updateGuest = async (id: string, payload: IGuest) => {
  const result = await prisma.guest.findUnique({
    where: {
      id: id,
    },
    select: {
      name: true,
    },
  });
  if (!result) {
    throw new Error('Guest not found');
  }
  const data = await prisma.guest.update({
    where: {
      id: id,
    },
    data: {
      name: payload.name,
    },
  });
  return data;
};
const deleteGuest = async (id: string) => {
  const result = await prisma.guest.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const GuestService = {
  createGuest,
  getGuests,
  updateGuest,
  deleteGuest,
};
