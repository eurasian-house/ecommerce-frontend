export async function uploadCustomerImage(file, folder) {
    const formData = new FormData();

    formData.append("file", file);
    formData.append(
        "upload_preset",
        import.meta.env.VITE_CUSTOMER_UPLOAD_PRESET
    );
    formData.append("folder", folder);

    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CUSTOMER_CLOUD_NAME}/image/upload`,
        {
            method: "POST",
            body: formData,
        }
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error?.message || "Image upload failed");
    }

    return data.secure_url;
}