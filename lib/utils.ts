// utils/paths.ts
export const getAssetPath = (path: string): string => {
  // If path is already absolute (like an external URL), leave it alone
  if (!path || path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // Ensure the path starts with a slash
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  // Prepend your GitHub repository name subfolder
  const basePath = '/project';
  
  return `${basePath}${cleanPath}`;
};