import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { compressImage, IMAGE_RULES } from "../../utils/imageCompression";

export default function AddProduct() {

    const initialForm = {
        title: "",
        main_category: "",
        sub_category: "",
        item_type: "",
        description: "",
        shape: "",
        mrp: "",
        discount_percent: "",
        selling_price: "",
        materials: "",
        primary_color: "",
        other_colors: [],
        tags: [],
        thumbnail: "",
        images: [],
        quality: "",
        hsn: "",
        status: "",
        colors: [{ color_name: "", color_image: "" }],
        sizes: [{ size: "", mrp_variation: "", discount_variation: "", selling_price: "", stock: "", sku: "" }]
    };

    const [form, setForm] = useState(initialForm);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [errors, setErrors] = useState({});
    const location = useLocation();
    const navData = location.state;

    const uploadImage = async (file, folder = "products/misc") => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "ecommerce_upload");
        formData.append("folder", folder); // ✅ NEW

        const res = await axios.post(
            "https://api.cloudinary.com/v1_1/dfbzqjwss/image/upload",
            formData
        );

        return res.data.secure_url;
    };
    const resetForm = () => {
        setForm(initialForm);
        setIsEditing(false);
        setEditingId(null);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });

        setErrors(prev => ({
            ...prev,
            [e.target.name]: false
        }));
    };

    const handleArrayInput = (e, field) => {
        setForm({ ...form, [field]: e.target.value.split(",") });
    };

    const handleColorChange = (i, e) => {
        const updated = [...form.colors];
        updated[i][e.target.name] = e.target.value;
        setForm({ ...form, colors: updated });
    };

    const handleSizeChange = (i, e) => {
        const updated = [...form.sizes];
        updated[i][e.target.name] = e.target.value;

        const mrp = Number(updated[i].mrp_variation || 0);
        const discount = Number(updated[i].discount_variation || 0);

        if (mrp && discount) {
            updated[i].selling_price = mrp - (mrp * discount) / 100;
        } else {
            updated[i].selling_price = "";
        }

        setForm({ ...form, sizes: updated });
    };

    const addColor = () => {
        setForm({ ...form, colors: [...form.colors, { color_name: "", color_image: "" }] });
    };

    const addSize = () => {
        setForm({
            ...form,
            sizes: [...form.sizes, { size: "", mrp_variation: "", discount_variation: "", selling_price: "", stock: "", sku: "" }]
        });
    };

    const removeColor = (index) => {
        const updated = [...form.colors];
        updated.splice(index, 1);
        setForm({ ...form, colors: updated });
    };

    const removeSize = (index) => {
        const updated = [...form.sizes];
        updated.splice(index, 1);
        setForm({ ...form, sizes: updated });
    };

    const validateForm = () => {
        let newErrors = {};

        if (!form.title) newErrors.title = true;
        if (!form.main_category) newErrors.main_category = true;
        if (!form.sub_category) newErrors.sub_category = true;
        if (!form.item_type) newErrors.item_type = true;
        if (!form.description) newErrors.description = true;
        if (!form.mrp) newErrors.mrp = true;
        if (!form.discount_percent) newErrors.discount_percent = true;
        if (!form.selling_price) newErrors.selling_price = true;
        if (!form.materials) newErrors.materials = true;
        if (!form.primary_color) newErrors.primary_color = true;
        if (!form.thumbnail) newErrors.thumbnail = true;

        if (!form.quality) newErrors.quality = true;
        if (!form.hsn) newErrors.hsn = true;
        if (!form.status) newErrors.status = true;

        if (form.images.length === 0) newErrors.images = true;
        if (form.colors.length === 0) newErrors.colors = true;
        if (form.sizes.length === 0) newErrors.sizes = true;

        for (let c of form.colors) {
            if (!c.color_name || !c.color_image) {
                newErrors.colors = true;
                break;
            }
        }

        for (let s of form.sizes) {
            if (!s.size || !s.selling_price || !s.stock || !s.sku) {
                newErrors.sizes = true;
                break;
            }
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validateForm()) {
            alert("Fill all fields");
            return;
        }

        if (isEditing) {
            await supabase.from("products").update({
                title: form.title,
                main_category: form.main_category,
                sub_category: form.sub_category,
                item_type: form.item_type,
                description: form.description,
                mrp: form.mrp,
                discount_percent: form.discount_percent,
                selling_price: form.selling_price,
                materials: form.materials,
                primary_color: form.primary_color,
                shape: form.shape,
                other_colors: form.other_colors,
                tags: form.tags,
                quality: form.quality,
                hsn: form.hsn,
                status: form.status,
                thumbnail: form.thumbnail,
                images: form.images
            }).eq("id", editingId);

            await supabase.from("product_colors").delete().eq("product_id", editingId);
            await supabase.from("product_sizes").delete().eq("product_id", editingId);

            await supabase.from("product_colors").insert(
                form.colors.map(c => ({
                    product_id: editingId,
                    color_name: c.color_name,
                    color_image: c.color_image
                }))
            );

            await supabase.from("product_sizes").insert(
                form.sizes.map(s => ({
                    product_id: editingId,
                    size: s.size,
                    mrp_variation: s.mrp_variation,
                    discount_variation: s.discount_variation,
                    selling_price: s.selling_price,
                    stock: s.stock,
                    sku: s.sku
                }))
            );

            alert("Product Updated ✅");
        } else {
            const { data: product } = await supabase
                .from("products")
                .insert([{
                    title: form.title,
                    main_category: form.main_category,
                    sub_category: form.sub_category,
                    item_type: form.item_type,
                    description: form.description,
                    mrp: form.mrp,
                    discount_percent: form.discount_percent,
                    selling_price: form.selling_price,
                    materials: form.materials,
                    primary_color: form.primary_color,
                    shape: form.shape,
                    other_colors: form.other_colors,
                    tags: form.tags,
                    quality: form.quality,
                    hsn: form.hsn,
                    status: form.status,
                    thumbnail: form.thumbnail,
                    images: form.images,
                    views: 0,
                    clicks: 0
                }])
                .select()
                .single();

            const productId = product.id;

            await supabase.from("product_colors").insert(
                form.colors.map(c => ({
                    product_id: productId,
                    color_name: c.color_name,
                    color_image: c.color_image
                }))
            );

            await supabase.from("product_sizes").insert(
                form.sizes.map(s => ({
                    product_id: productId,
                    size: s.size,
                    mrp_variation: s.mrp_variation,
                    discount_variation: s.discount_variation,
                    selling_price: s.selling_price,
                    stock: s.stock,
                    sku: s.sku
                }))
            );

            alert("Product Added ✅");
        }

        resetForm();
    };

    // useEffect(() => {
    //     if (form.mrp && form.discount_percent) {
    //         const sp = form.mrp - (form.mrp * form.discount_percent) / 100;
    //         setForm((prev) => ({ ...prev, selling_price: sp }));
    //     }
    // }, [form.mrp, form.discount_percent]);
    useEffect(() => {
        if (!navData || !navData.product) return;

        const { mode, product } = navData;

        setForm({
            ...initialForm,
            ...product
        });

        if (mode === "edit") {
            setIsEditing(true);
            setEditingId(product.id);
        } else {
            setIsEditing(false);
            setEditingId(null);
        }

    }, []);

    useEffect(() => {
        const mrp = Number(form.mrp);
        const discount = Number(form.discount_percent);

        if (!mrp || !discount) return;

        const sp = mrp - (mrp * discount) / 100;

        // prevent unnecessary state updates
        if (sp !== form.selling_price) {
            setForm((prev) => ({
                ...prev,
                selling_price: sp
            }));
        }

    }, [form.mrp, form.discount_percent]);


    const optimizeUrl = (url) => {
        return url.replace(
            "/upload/",
            "/upload/f_auto,q_auto,w_auto/"
        );
    };

    return (
        <div className="container mt-4">
            <div className="card p-4">
                <h3>{isEditing ? "Edit Product" : "Add Product"}</h3>

                <input className={`form-control mb-2 ${errors.title ? "is-invalid" : ""}`} name="title" value={form.title} placeholder="Title" onChange={handleChange} />
                <input className={`form-control mb-2 ${errors.main_category ? "is-invalid" : ""}`} name="main_category" value={form.main_category} placeholder="Main Category" onChange={handleChange} />
                <input className={`form-control mb-2 ${errors.sub_category ? "is-invalid" : ""}`} name="sub_category" value={form.sub_category} placeholder="Sub Category" onChange={handleChange} />
                <input className={`form-control mb-2 ${errors.item_type ? "is-invalid" : ""}`} name="item_type" value={form.item_type} placeholder="physical/digital" onChange={handleChange} />
                <textarea className={`form-control mb-2 ${errors.description ? "is-invalid" : ""}`} name="description" value={form.description} placeholder="Description" onChange={handleChange} />

                <input className={`form-control mb-2 ${errors.mrp ? "is-invalid" : ""}`} name="mrp" value={form.mrp} placeholder="MRP in $" onChange={handleChange} />
                <input className={`form-control mb-2 ${errors.discount_percent ? "is-invalid" : ""}`} name="discount_percent" value={form.discount_percent} placeholder="Discount %" onChange={handleChange} />
                <input className={`form-control mb-2 ${errors.selling_price ? "is-invalid" : ""}`} value={form.selling_price} readOnly placeholder="Selling Price" />

                <input className={`form-control mb-2 ${errors.materials ? "is-invalid" : ""}`} name="materials" value={form.materials} placeholder="Materials" onChange={handleChange} />
                <input className={`form-control mb-2 ${errors.primary_color ? "is-invalid" : ""}`} name="primary_color" value={form.primary_color} placeholder="Primary Color" onChange={handleChange} />
                <input className="form-control mb-2" name="shape" value={form.shape} placeholder="Shape" onChange={handleChange} />

                <input className="form-control mb-2" value={form.other_colors.join(",")} placeholder="Other Colors" onChange={(e) => handleArrayInput(e, "other_colors")} />
                <input className="form-control mb-2" value={form.tags.join(",")} placeholder="Tags" onChange={(e) => handleArrayInput(e, "tags")} />

                <input className={`form-control mb-2 ${errors.quality ? "is-invalid" : ""}`} name="quality" value={form.quality} placeholder="Quality" onChange={handleChange} />
                <input className={`form-control mb-2 ${errors.hsn ? "is-invalid" : ""}`} name="hsn" value={form.hsn} placeholder="HSN Code" onChange={handleChange} />

                <select className={`form-control mb-2 ${errors.status ? "is-invalid" : ""}`} name="status" value={form.status} onChange={handleChange}>
                    <option value="">Select Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>

                <div>Upload Thumbnail</div>
                <input type="file" className={`form-control mb-2 ${errors.thumbnail ? "is-invalid" : ""}`} onChange={async e => {
                    const file = e.target.files[0];

                    const compressed = await compressImage(
                        file,
                        IMAGE_RULES.thumbnail
                    );

                    const url = await uploadImage(
                        compressed,
                        "products/thumbnails"
                    );

                    setForm(prev => ({
                        ...prev,
                        thumbnail: optimizeUrl(url)
                    }));
                    setForm(prev => ({ ...prev, thumbnail: url }));
                }} />

                <div>Upload Images</div>
                <input type="file" multiple className={`form-control mb-2 ${errors.images ? "is-invalid" : ""}`} onChange={async e => {
                    const files = [...e.target.files];

                    const urls = await Promise.all(
                        files.map(async (file) => {
                            const compressed = await compressImage(
                                file,
                                IMAGE_RULES.gallery
                            );

                            const url = await uploadImage(
                                compressed,
                                "products/gallery"
                            );

                            return optimizeUrl(url);
                        })
                    );

                    setForm(prev => ({ ...prev, images: urls }));
                    setForm(prev => ({ ...prev, images: urls }));
                }} />

                <h5 className="mt-3">Color Variations</h5>
                {form.colors.map((c, i) => (
                    <div key={i} className="d-flex gap-2 mb-2">
                        <input className="form-control" name="color_name" placeholder="Color Name" value={c.color_name} onChange={(e) => handleColorChange(i, e)} />
                        <input type="file" className="form-control" onChange={async (e) => {
                            const file = e.target.files[0];

                            const compressed = await compressImage(
                                file,
                                IMAGE_RULES.variant
                            );

                            const url = await uploadImage(
                                compressed,
                                "products/variants"
                            );

                            const updated = [...form.colors];
                            updated[i].color_image = optimizeUrl(url);

                            setForm({ ...form, colors: updated });
                            updated[i].color_image = url;
                            setForm({ ...form, colors: updated });
                        }} />
                        <button className="btn btn-danger" onClick={() => removeColor(i)}>X</button>
                    </div>
                ))}
                <button className="btn btn-secondary w-100 mb-3" onClick={addColor}>Add Color</button>

                <h5>Size Variations</h5>
                {form.sizes.map((s, i) => (
                    <div key={i} className="d-flex gap-2 mb-2">
                        <input className="form-control" name="size" placeholder="Size" value={s.size} onChange={(e) => handleSizeChange(i, e)} />
                        <input className="form-control" name="mrp_variation" placeholder="MRP in $" value={s.mrp_variation} onChange={(e) => handleSizeChange(i, e)} />
                        <input className="form-control" name="discount_variation" placeholder="Discount %" value={s.discount_variation} onChange={(e) => handleSizeChange(i, e)} />
                        <input className="form-control" name="selling_price" placeholder="Selling Price" value={s.selling_price} readOnly />
                        <input className="form-control" name="stock" placeholder="Stock" value={s.stock} onChange={(e) => handleSizeChange(i, e)} />
                        <input className="form-control" name="sku" placeholder="SKU" value={s.sku} onChange={(e) => handleSizeChange(i, e)} />
                        <button className="btn btn-danger" onClick={() => removeSize(i)}>X</button>
                    </div>
                ))}
                <button className="btn btn-secondary w-100 mb-3" onClick={addSize}>Add Size</button>

                <button className="btn btn-primary mt-3" onClick={handleSave}>
                    {isEditing ? "Update Product" : "Save Product"}
                </button>
            </div>
        </div>
    );
}