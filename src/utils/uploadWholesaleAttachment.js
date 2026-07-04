export async function uploadWholesaleAttachment(file) {
  if (!file) return null;

  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    import.meta.env.VITE_CUSTOMER_UPLOAD_PRESET
  );

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CUSTOMER_CLOUD_NAME}/auto/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    const error = await res.json();
    console.error(error);
    throw new Error(error.error?.message || "Attachment upload failed.");
  }

  const data = await res.json();
  return data.secure_url;
}