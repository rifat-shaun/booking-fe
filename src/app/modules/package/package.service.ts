import { Business_HourDay } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IPackage } from './package.interface';

// create package
const createPackage = async (payload: IPackage) => {
  const result = await prisma.$transaction(async transaction => {
    const { child_packages, ...packagesData } = payload || {};
    const packageData = await transaction.package.create({
      data: {
        ...packagesData,
      },
    });
    if (!packageData) {
      throw new Error('Package not created');
    }

    if (child_packages) {
      const mergePackage = child_packages.map(item => {
        return {
          ...item,
          package_id: packageData.id,
        };
      });
      const subPackageData = await transaction.sub_Package.createMany({
        data: mergePackage,
        skipDuplicates: true,
      });
      if (!subPackageData) {
        throw new Error('Sub Package not created');
      }
    }
    return packageData;
  });
};

// get All Packages

const getAllPackages = async () => {
  const result = await prisma.package.findMany({
    where: {
      active: true,
    },
    include: {
      child_packages: true,
    },
  });
  return result;
};

// get single package data

const getSinglePackage = async (id: string) => {
  const isPackage = await prisma.package.findUnique({
    where: {
      id: id,
    },
  });
  if (!isPackage) {
    throw new Error('Package not found');
  }
  const result = await prisma.package.findUnique({
    where: {
      id: id,
    },
    include: {
      child_packages: true,
    },
  });
  return result;
};

const updatePackageData = async (id: string, payload: Partial<IPackage>) => {
  const existingPackage = await prisma.package.findUnique({
    where: {
      id: id,
    },
  });

  const { child_packages, ...packagesData } = payload || {};
  if (!existingPackage) {
    throw new Error('Package not found');
  }
  const result = await prisma.package.update({
    where: {
      id,
    },
    data: {
      ...packagesData,
    },
  });
  return result;
};

// update active status
const updatePackageStatus = async (id: string, payload: Partial<IPackage>) => {
  const result = await prisma.package.update({
    where: {
      id,
    },
    data: {
      active: payload.active,
    },
  });
  return result;
};

// update active days

const updatePackageDays = async (id: string, payload: Business_HourDay) => {
  const existingPackage = await prisma.package.findUnique({
    where: {
      id: id,
    },
    select: {
      active_days: true, // Include the active_days array
    },
  });

  if (!existingPackage) {
    throw new Error('Package not found');
  }

  // Check if the new active day already exists in the array
  if (!existingPackage.active_days.includes(payload)) {
    // Add the new active day to the array
    const updatedActiveDays = [...existingPackage.active_days, payload];

    // Update the package in the database with the modified active_days array
    const updatedPackage = await prisma.package.update({
      where: {
        id: id,
      },
      data: {
        active_days: {
          set: updatedActiveDays,
        },
      },
    });

    return updatedPackage;
  } else {
    throw new Error('Active day already exists');
  }
};

// remove active days for package

const removePackageDays = async (id: string, payload: Business_HourDay) => {
  const existingPackage = await prisma.package.findUnique({
    where: {
      id: id,
    },
    select: {
      active_days: true, // Include the active_days array
    },
  });
  if (!existingPackage) {
    throw new Error('Package not found');
  }
  const removeActiveDays = existingPackage.active_days.filter(
    day => day !== payload,
  );

  // Update the package in the database with the modified active_days array
  const removePackage = await prisma.package.update({
    where: {
      id: id,
    },
    data: {
      active_days: {
        set: removeActiveDays,
      },
    },
  });

  return removePackage;
};

// update start Date

const updatePackageStartDate = async (id: string, payload: string) => {
  const existingPackage = await prisma.package.findUnique({
    where: {
      id: id,
    },
  });
  if (!existingPackage) {
    throw new Error('Package not found');
  }
  const updatedPackage = await prisma.package.update({
    where: {
      id: id,
    },
    data: {
      start_date: payload,
    },
  });
  if (!updatedPackage) {
    throw new Error('Start Date is not update');
  }
  return updatedPackage;
};

const updatePackageEndDate = async (id: string, payload: string) => {
  const existingPackage = await prisma.package.findUnique({
    where: {
      id: id,
    },
  });
  if (!existingPackage) {
    throw new Error('Package not found');
  }
  const updatedPackage = await prisma.package.update({
    where: {
      id: id,
    },
    data: {
      end_date: payload,
    },
  });
  if (!updatedPackage) {
    throw new Error('End Date is not update');
  }
  return updatedPackage;
};

export const PackageService = {
  createPackage,
  getAllPackages,
  updatePackageStatus,
  updatePackageDays,
  removePackageDays,
  updatePackageStartDate,
  updatePackageEndDate,
  updatePackageData,
  getSinglePackage,
};
