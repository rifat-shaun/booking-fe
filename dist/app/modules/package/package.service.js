"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
// create package
const createPackage = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((transaction) => __awaiter(void 0, void 0, void 0, function* () {
        const _a = payload || {}, { child_packages } = _a, packagesData = __rest(_a, ["child_packages"]);
        const packageData = yield transaction.package.create({
            data: Object.assign({}, packagesData),
        });
        if (!packageData) {
            throw new Error('Package not created');
        }
        if (child_packages) {
            const mergePackage = child_packages.map(item => {
                return Object.assign(Object.assign({}, item), { package_id: packageData.id });
            });
            const subPackageData = yield transaction.sub_Package.createMany({
                data: mergePackage,
                skipDuplicates: true,
            });
            if (!subPackageData) {
                throw new Error('Sub Package not created');
            }
        }
        return packageData;
    }));
});
// get All Packages
const getAllPackages = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.package.findMany({
        where: {
            active: true,
        },
        include: {
            child_packages: true,
        },
    });
    return result;
});
// get single package data
const getSinglePackage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isPackage = yield prisma_1.default.package.findUnique({
        where: {
            id: id,
        },
    });
    if (!isPackage) {
        throw new Error('Package not found');
    }
    const result = yield prisma_1.default.package.findUnique({
        where: {
            id: id,
        },
        include: {
            child_packages: true,
        },
    });
    return result;
});
const updatePackageData = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingPackage = yield prisma_1.default.package.findUnique({
        where: {
            id: id,
        },
    });
    const _b = payload || {}, { child_packages } = _b, packagesData = __rest(_b, ["child_packages"]);
    if (!existingPackage) {
        throw new Error('Package not found');
    }
    const result = yield prisma_1.default.package.update({
        where: {
            id,
        },
        data: Object.assign({}, packagesData),
    });
    return result;
});
// update active status
const updatePackageStatus = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.package.update({
        where: {
            id,
        },
        data: {
            active: payload.active,
        },
    });
    return result;
});
// update active days
const updatePackageDays = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingPackage = yield prisma_1.default.package.findUnique({
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
        const updatedPackage = yield prisma_1.default.package.update({
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
    }
    else {
        throw new Error('Active day already exists');
    }
});
// remove active days for package
const removePackageDays = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingPackage = yield prisma_1.default.package.findUnique({
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
    const removeActiveDays = existingPackage.active_days.filter(day => day !== payload);
    // Update the package in the database with the modified active_days array
    const removePackage = yield prisma_1.default.package.update({
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
});
// update start Date
const updatePackageStartDate = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingPackage = yield prisma_1.default.package.findUnique({
        where: {
            id: id,
        },
    });
    if (!existingPackage) {
        throw new Error('Package not found');
    }
    const updatedPackage = yield prisma_1.default.package.update({
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
});
const updatePackageEndDate = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingPackage = yield prisma_1.default.package.findUnique({
        where: {
            id: id,
        },
    });
    if (!existingPackage) {
        throw new Error('Package not found');
    }
    const updatedPackage = yield prisma_1.default.package.update({
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
});
exports.PackageService = {
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
