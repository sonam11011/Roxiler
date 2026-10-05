export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,16}$/;
export function validateUserInput({ name, email, password, address }, requirePassword = true) {
  const errors = {};
  if (typeof name !== 'string' || name.trim().length < 20 || name.trim().length > 60) errors.name = 'Name must be between 20 and 60 characters.';
  if (typeof email !== 'string' || !emailRegex.test(email.trim())) errors.email = 'Enter a valid email address.';
  if (requirePassword && (typeof password !== 'string' || !passwordRegex.test(password))) errors.password = 'Password must be 8–16 characters with at least one uppercase letter and one special character.';
  if (typeof address !== 'string' || address.trim().length > 400 || !address.trim()) errors.address = 'Address is required and must be at most 400 characters.';
  return errors;
}
