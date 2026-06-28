export async function lookupAddress(countryCode, postalCode) {
  if (!countryCode || !postalCode) return null;

  try {
    const res = await fetch(
      `https://api.zippopotam.us/${countryCode}/${postalCode}`
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