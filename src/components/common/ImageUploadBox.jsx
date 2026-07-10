import { useState } from "react";

export default function ImageUploadBox({
    label,
    multiple = false,
    preview,
    onSelect,
}) {

    const [dragging, setDragging] = useState(false);

    const handleFiles = (files) => {
        if (!files || files.length === 0) return;
        onSelect(multiple ? files : files[0]);
    };

    return (
        <div>

            {!preview ? (

                <label
                    className={`image-upload-box ${dragging ? "dragging" : ""}`}

                    onDragOver={(e) => {
                        e.preventDefault();
                        setDragging(true);
                    }}

                    onDragLeave={() => setDragging(false)}

                    onDrop={(e) => {
                        e.preventDefault();
                        setDragging(false);
                        handleFiles(e.dataTransfer.files);
                    }}
                >

                    <i className="bi bi-cloud-arrow-up fs-1 mb-3"></i>

                    <h6 className="mb-2">
                        Drag & Drop Image
                    </h6>

                    <small className="text-muted">
                        or click to browse
                    </small>

                    <input
                        hidden
                        type="file"
                        multiple={multiple}
                        accept="image/*"
                        onChange={(e) => handleFiles(e.target.files)}
                    />

                </label>

            ) : (

                <div className="text-center">

                    <img
                        src={preview}
                        alt=""
                        className="upload-preview img-fluid"
                    />

                    <div className="mt-3">

                        <label className="btn btn-outline-dark rounded-pill">

                            Change Image

                            <input
                                hidden
                                type="file"
                                multiple={multiple}
                                accept="image/*"
                                onChange={(e) => handleFiles(e.target.files)}
                            />

                        </label>

                    </div>

                </div>

            )}

        </div>
    );
}