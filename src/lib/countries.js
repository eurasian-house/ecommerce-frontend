import countryList from "react-select-country-list";

const allCountries = countryList().getData();

const priority = ["US", "GB", "CA", "AU"];

const topCountries = allCountries.filter((c) =>
  priority.includes(c.value)
);

const remainingCountries = allCountries.filter(
  (c) => !priority.includes(c.value)
);

export const countries = [
  ...topCountries,
  { value: "", label: "──────────" },
  ...remainingCountries,
];