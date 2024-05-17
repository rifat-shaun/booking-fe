export const generateSlug = (title: string): string => {
  // Convert to lowercase and replace spaces with dashes
  const slug = title.toLowerCase().replace(/\s+/g, '-');

  // Remove special characters
  const cleanSlug = slug.replace(/[^\w-]/g, '');

  return cleanSlug;
};
