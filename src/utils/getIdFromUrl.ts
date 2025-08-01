export const getIdFromUrl = (url: string): string => {
  const match = url.match(/\/people\/(\d+)\//);
  return match ? match[1] : '';
};
