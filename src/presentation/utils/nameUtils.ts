export const extractFirstName = (fullName: string): string => {
  // Remove any leading/trailing whitespace
  const trimmedName = fullName.trim();
  
  // Match the first word that contains only letters, hyphens, and apostrophes
  const firstNameMatch = trimmedName.match(/^[A-Za-zÀ-ÿ'-]+/);
  
  // Return the first name if found, otherwise return the original name
  return firstNameMatch ? firstNameMatch[0] : trimmedName;
}; 