import countryList from "react-select-country-list";

export async function lookupAddress(countryName, postalCode) {
  if (!countryName || !postalCode) return null;

  const country = countryList()
    .getData()
    .find((c) => c.label === countryName);

  if (!country) return null;

  try {
    const res = await fetch(
      `https://api.zippopotam.us/${country.value.toLowerCase()}/${postalCode}`
    );

    if (!res.ok) return null;

    const data = await res.json();

    return {
      city: data.places?.[0]?.["place name"] || "",
      state: data.places?.[0]?.state || "",
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}