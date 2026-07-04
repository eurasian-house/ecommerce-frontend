export const compressImage = (file, { maxWidth, quality }) => {
    return new Promise((resolve) => {
        const img = new Image();
        const reader = new FileReader();

        reader.onload = (e) => {
            img.src = e.target.result;
        };

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const scale = maxWidth / img.width;

            canvas.width = maxWidth;
            canvas.height = img.height * scale;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            canvas.toBlob(
                (blob) => {
                    const compressedFile = new File([blob], file.name, {
                        type: "image/jpeg",
                    });
                    resolve(compressedFile);
                },
                "image/jpeg",
                quality
            );
        };

        reader.readAsDataURL(file);
    });
};


// RULES (single source of truth)
export const IMAGE_RULES = {
    thumbnail: { maxWidth: 600, quality: 0.7 },
    gallery: { maxWidth: 1200, quality: 0.75 },
    variant: { maxWidth: 800, quality: 0.7 },

    // Customer avatar
    avatar: {
        maxWidth: 256,
        quality: 0.6,
    },
};