export const formatName = (name: string): string => {
  // First separate camelCase into words
  const separatedCamel = name.replace(/([a-z])([A-Z])/g, '$1 $2');
  
  // Convert to title case
  return separatedCamel
    .trim()
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const validateName = (name: string): boolean => {
  // Check if name is empty or only whitespace
  if (!name.trim()) return false;
  
  // Check if name contains only letters, spaces, and common special characters
  const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/;
  return nameRegex.test(name);
};

export const validateEmail = (email: string): boolean => {
  // Check if email is empty
  if (!email.trim()) return false;
  
  // RFC 5322 compliant email regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email.trim());
};

export const validateReferralText = (text: string): boolean => {
  if (!text.trim()) return true; // Allow empty as it's optional
  
  // Allow letters, numbers, @, spaces, and common punctuation, between 2-100 chars
  const referralRegex = /^[a-zA-Z0-9@\s.,'-]{2,100}$/;
  return referralRegex.test(text.trim());
};

export const sanitizeInput = (input: string): string => {
  // Only remove potentially dangerous characters, preserve spaces
  return input.replace(/[<>&"']/g, '');
};

// New function to format the final name when submitting
export const formatFinalName = (input: string): string => {
  return formatName(sanitizeInput(input));
};

export const validatePhoneNumber = (phone: string): boolean => {
  // Allow empty string since we'll make it required in the form
  if (!phone.trim()) return false;
  
  // Basic phone number validation - allows international formats
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone.replace(/[\s()-]/g, ''));
}; 