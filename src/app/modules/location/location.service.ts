import prisma from '../../../shared/prisma';
import { ILocation, IParentLocation } from './location.interface';

// create start location
const createStartLocation = async (payload: IParentLocation) => {
  const { child_locations, name } = payload;
  const result = await prisma.$transaction(async transaction => {
    const parentLocation = await transaction.start_Location.create({
      data: {
        name,
      },
    });
    if (child_locations?.length) {
      const mergeLocation = child_locations.map(item => {
        return {
          ...item,
          start_point_id: parentLocation.id,
        };
      });
      const locationData = await transaction.location.createMany({
        data: mergeLocation,
      });
      if (!locationData) {
        throw new Error('Location not created');
      }
    }
  });
  return result;
};

// create end location
const createEndLocation = async (payload: IParentLocation) => {
  const { child_locations, name } = payload;
  const result = await prisma.$transaction(async transaction => {
    const parentLocation = await transaction.end_Location.create({
      data: {
        name,
      },
    });
    if (child_locations?.length) {
      const mergeLocation = child_locations.map(item => {
        return {
          ...item,
          end_point_id: parentLocation.id,
        };
      });
      const locationData = await transaction.location.createMany({
        data: mergeLocation,
      });
      if (!locationData) {
        throw new Error('Location not created');
      }
    }
  });
  return result;
};

const createLocation = async (payload: ILocation) => {
  const { start_point_id, end_point_id, name } = payload;
  if (start_point_id || end_point_id) {
    const startLocation = await prisma.start_Location.findUnique({
      where: {
        id: start_point_id,
      },
    });
    if (!startLocation) {
      throw new Error('Start location is not exists');
    }
  }
  if (end_point_id) {
    const endLocation = await prisma.end_Location.findUnique({
      where: {
        id: end_point_id,
      },
    });
    if (!endLocation) {
      throw new Error('End location is not exists');
    }
  }
  const result = await prisma.location.create({
    data: payload,
  });
  return result;
};

// list start locations
const listStartLocations = async () => {
  const result = await prisma.start_Location.findMany({
    include: {
      child_locations: true,
    },
  });
  return result;
};

// list end locations
const listEndLocations = async () => {
  const result = await prisma.end_Location.findMany({
    include: {
      child_locations: true,
    },
  });
  return result;
};

// list locations
const listOfLocations = async () => {
  const result = await prisma.location.findMany({
    include: {
      start_point: true,
      end_point: true,
    },
  });
  return result;
};

export const LocationService = {
  createStartLocation,
  createEndLocation,
  listStartLocations,
  listEndLocations,
  listOfLocations,
  createLocation,
};
