import prisma from '../../../shared/prisma';
import { IPrice } from './price.interface';

const createPrice = async (payload: IPrice) => {
  const isPackageExists = await prisma.package.findFirst({
    where: {
      id: payload.package_id,
    },
  });

  if (!isPackageExists) {
    throw new Error('Package not found');
  }

  const isGuestExists = await prisma.guest.findFirst({
    where: {
      id: payload.guest_id,
    },
  });

  if (!isGuestExists) {
    throw new Error('guest not found');
  }

  const isStartPointExists = await prisma.start_Location.findFirst({
    where: {
      id: payload.start_point_id,
    },
  });
  // check if start point exists
  if (!isStartPointExists) {
    throw new Error('Start point not found');
  }
  const isEndPointExists = await prisma.end_Location.findFirst({
    where: {
      id: payload.end_point_id,
    },
  });

  if (!isEndPointExists) {
    throw new Error('End point not found');
  }

  const newPrice = await prisma.price.create({
    data: payload,
  });
  return newPrice;
};

const getPrices = async () => {
  const prices = await prisma.price.findMany({
    include: {
      package: true,
      start_point: true,
      end_point: true,
      guest: true,
    },
  });
  return prices;
};

// get price depends on location, package and guest

const getPriceForAdultGuest = async (
  package_id: string,
  start_point_id: string,
  end_point_id: string,
  guest_id: string,
) => {
  if (!guest_id) {
    throw new Error('Please provide all required fields');
  }
  const price = await prisma.price.findFirst({
    where: {
      package_id,
      start_point_id,
      end_point_id,
      guest_id,
    },
    include: {
      package: true,
      start_point: true,
      end_point: true,
      guest: true,
    },
  });

  return price;
};
// get price depends on location, package and guest

const getPriceForChildGuest = async (
  package_id: string,
  start_point_id: string,
  end_point_id: string,
  guest_id: string,
) => {
  const price = await prisma.price.findFirst({
    where: {
      package_id,
      start_point_id,
      end_point_id,
      guest_id,
    },
    include: {
      package: true,
      start_point: true,
      end_point: true,
      guest: true,
    },
  });
  return price;
};

export const PriceService = {
  createPrice,
  getPriceForChildGuest,
  getPrices,
  getPriceForAdultGuest,
};
