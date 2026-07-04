export const compressCustomerImage = (file) => {
    return new Promise((resolve, reject) => {
        if (!file.type.startsWith("image/")) {
            return reject(new Error("Please select an image."));
        }

        const img = new Image();
        const reader = new FileReader();

        reader.onload = (e) => {
            img.src = e.target.result;
        };

        reader.onerror = reject;

        img.onload = () => {
            const MAX_WIDTH = 1200;

            let width = img.width;
            let height = img.height;

            if (width > MAX_WIDTH) {
                const ratio = MAX_WIDTH / width;
                width = MAX_WIDTH;
                height = Math.round(height * ratio);
            }

            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;

            canvas
                .getContext("2d")
                .drawImage(img, 0, 0, width, height);

            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        return reject(new Error("Compression failed."));
                    }

                    resolve(
                        new File(
                            [blob],
                            file.name.replace(/\.\w+$/, ".webp"),
                            {
                                type: "image/webp",
                            }
                        )
                    );
                },
                "image/webp",
                0.7
            );
        };

        img.onerror = reject;
        reader.readAsDataURL(file);
    });
};