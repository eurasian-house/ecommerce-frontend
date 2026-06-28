export const validateName = (name) => {
  if (!name.trim()) return "Name is required.";
  if (name.trim().length < 2) return "Name must be at least 2 characters.";
  return "";
};

export const validatePhone = (phone) => {
  if (!phone.trim()) return "Phone number is required.";

  const cleaned = phone.replace(/[^\d+]/g, "");

  if (!/^\+?[\d]{7,15}$/.test(cleaned))
    return "Enter a valid phone number.";

  return "";
};

export const validateAddress = (address) => {
  if (!address.trim()) return "Address is required.";
  if (address.trim().length < 5)
    return "Address should be at least 5 characters.";
  return "";
};

export const validateCountry = (country) => {
  if (!country) return "Please select a country.";
  return "";
};

export const validatePostalCode = (postal) => {
  if (!postal.trim()) return "Postal code is required.";
  if (postal.trim().length < 3)
    return "Enter a valid postal code.";
  return "";
};

export const validateCity = (city) => {
  if (!city.trim()) return "City is required.";
  return "";
};

export const validateState = (state) => {
  if (!state.trim()) return "State/Province is required.";
  return "";
};