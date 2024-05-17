"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSlug = void 0;
const generateSlug = (title) => {
    // Convert to lowercase and replace spaces with dashes
    const slug = title.toLowerCase().replace(/\s+/g, '-');
    // Remove special characters
    const cleanSlug = slug.replace(/[^\w-]/g, '');
    return cleanSlug;
};
exports.generateSlug = generateSlug;
