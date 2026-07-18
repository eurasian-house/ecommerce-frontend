import { useState, useEffect, useRef } from "react";
import { supabase } from "../../lib/supabase";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { compressImage, IMAGE_RULES } from "../../utils/imageCompression";
import ImageUploadBox from "../../components/common/ImageUploadBox";
import "./AddProduct.css";
import ProductSelect from "../../components/common/ProductSelect";

import {
    MAIN_CATEGORIES,
    SUB_CATEGORIES,
    MATERIALS,
    SHAPES,
    PATTERNS,
    QUALITIES,
    COLORS,
    ITEM_TYPES,
    STATUS_OPTIONS,
    CATEGORY_CODES,
    SHAPE_CODES,
} from "../../data/productOptions";

const generateProductCode = async () => {

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    while (true) {

        const code = Array.from(
            { length: 4 },
            () => chars[Math.floor(Math.random() * chars.length)]
        ).join("");

        const { data } = await supabase
            .from("product_sizes")
            .select("id")
            .ilike("sku", `%-${code}-%`)
            .limit(1);

        if (!data || data.length === 0) {
            return code;
        }
    }
};

const formatSizeCode = (size = "") => {

    const match = size.match(/(\d+(?:\.\d+)?)\s*[x×]\s*(\d+(?:\.\d+)?)\s*ft/i);

    if (!match) return "";

    return `${match[1]}X${match[2]}`;
};

export default function AddProduct() {

    const initialForm = {
        title: "",
        slug: "",
        main_category: "",
        sub_category: [],
        item_type: "",
        description: "",
        production_days: "",
        shape: "",
        pattern: "",
        mrp: "",
        discount_percent: "",
        selling_price: "",
        materials: [],
        primary_color: "",
        other_colors: [],
        tags: [],
        thumbnail: "",
        images: [],
        quality: "",
        hsn: "",
        status: "",
        colors: [{ id: null, color_name: "", color_image: "" }],
        sizes: [{
            id: null,
            size: "",
            mrp_variation: "",
            discount_variation: "",
            selling_price: "",
            stock: "",
            sku: ""
        }]
    };

    const [form, setForm] = useState(initialForm);
    const [productCode, setProductCode] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [errors, setErrors] = useState({});
    const location = useLocation();

    const isDirty = useRef(false);
    const navData = location.state;

    const originalColorIds = useRef([]);
    const originalSizeIds = useRef([]);

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
        isDirty.current = false;
    };

    const createSlug = (text) => {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
    };

    const handleChange = (e) => {
        isDirty.current = true;
        const { name, value } = e.target;

        setForm((prev) => {
            const updated = {
                ...prev,
                [name]: value,
                ...(name === "title"
                    ? { slug: createSlug(value) }
                    : {})
            };

            if (name === "main_category" || name === "shape") {
                updated.sizes = regenerateSkus(
                    updated.sizes,
                    name === "main_category" ? value : updated.main_category,
                    name === "shape" ? value : updated.shape
                );
            }

            if (
                name === "primary_color" &&
                updated.colors.length &&
                !updated.colors[0].color_name
            ) {
                updated.colors = [...updated.colors];
                updated.colors[0] = {
                    ...updated.colors[0],
                    color_name: value,
                };
            }

            return updated;
        });

        setErrors(prev => ({
            ...prev,
            [name]: false
        }));
    };

    const handleArrayInput = (e, field) => {
        isDirty.current = true;
        setForm({ ...form, [field]: e.target.value.split(",") });
    };

    const handleColorChange = (i, e) => {
        isDirty.current = true;
        const updated = [...form.colors];
        updated[i][e.target.name] = e.target.value;
        setForm({ ...form, colors: updated });
    };

    const handleSizeChange = (i, e) => {
        isDirty.current = true;
        const updated = [...form.sizes];
        updated[i][e.target.name] = e.target.value;

        const mrp = Number(updated[i].mrp_variation || 0);
        const discount = Number(updated[i].discount_variation || 0);

        if (mrp && discount) {
            updated[i].selling_price = mrp - (mrp * discount) / 100;
        } else {
            updated[i].selling_price = "";
        }

        setForm({
            ...form,
            sizes: regenerateSkus(
                updated,
                form.main_category,
                form.shape
            ),
        });
    };

    const addColor = () => {
        isDirty.current = true;
        setForm({ ...form, colors: [...form.colors, { color_name: "", color_image: "" }] });
    };

    const addSize = () => {
        isDirty.current = true;

        const updated = [
            ...form.sizes,
            {
                id: null,
                size: "",
                mrp_variation: "",
                discount_variation: "",
                selling_price: "",
                stock: "",
                sku: "",
            },
        ];

        setForm({
            ...form,
            sizes: regenerateSkus(
                updated,
                form.main_category,
                form.shape
            ),
        });
    };

    const removeColor = (index) => {
        isDirty.current = true;
        const updated = [...form.colors];
        updated.splice(index, 1);
        setForm({ ...form, colors: updated });
    };

    const removeSize = (index) => {
        isDirty.current = true;
        const updated = [...form.sizes];
        updated.splice(index, 1);
        setForm({
            ...form,
            sizes: regenerateSkus(
                updated,
                form.main_category,
                form.shape
            ),
        });
    };


    const regenerateSkus = (sizes, category, shape) => {

        const categoryCode = CATEGORY_CODES[category] || "UNK";
        const shapeCode = SHAPE_CODES[shape] || "UNK";

        return sizes.map((size, index) => ({
            ...size,
            sku: `${categoryCode}${formatSizeCode(size.size)}${shapeCode}-${productCode}-${String(index + 1).padStart(3, "0")}`,
        }));
    };

    const validateForm = () => {
        let newErrors = {};

        if (!form.title) newErrors.title = true;
        if (!form.main_category) newErrors.main_category = true;
        if (form.sub_category.length === 0) newErrors.sub_category = true;
        if (!form.item_type) newErrors.item_type = true;
        if (!form.description) newErrors.description = true;
        if (!form.production_days) newErrors.production_days = true;
        if (!form.pattern) newErrors.pattern = true;
        if (!form.mrp) newErrors.mrp = true;
        if (!form.discount_percent) newErrors.discount_percent = true;
        if (!form.selling_price) newErrors.selling_price = true;
        if (form.materials.length === 0) newErrors.materials = true;
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
                slug: form.slug,
                main_category: form.main_category,
                sub_category: form.sub_category,
                item_type: form.item_type,
                description: form.description,
                production_days: form.production_days,
                mrp: form.mrp,
                discount_percent: form.discount_percent,
                selling_price: form.selling_price,
                materials: form.materials,
                primary_color: form.primary_color,
                shape: form.shape,
                pattern: form.pattern,
                other_colors: form.other_colors,
                tags: form.tags,
                quality: form.quality,
                hsn: form.hsn,
                status: form.status,
                thumbnail: form.thumbnail,
                images: form.images
            }).eq("id", editingId);

            const existingColors = form.colors.filter(c => c.id);

            if (existingColors.length) {
                const { error } = await supabase
                    .from("product_colors")
                    .upsert(
                        existingColors.map(c => ({
                            id: c.id,
                            product_id: editingId,
                            color_name: c.color_name,
                            color_image: c.color_image
                        }))
                    );

                if (error) throw error;
            }


            const newColors = form.colors.filter(c => !c.id);

            if (newColors.length) {
                await supabase
                    .from("product_colors")
                    .insert(
                        newColors.map(c => ({
                            product_id: editingId,
                            color_name: c.color_name,
                            color_image: c.color_image
                        }))
                    );
            }

            // Sizes
            const existingSizes = form.sizes.filter(s => s.id);

            if (existingSizes.length) {
                const { error } = await supabase
                    .from("product_sizes")
                    .upsert(
                        existingSizes.map((s, index) => ({
                            id: s.id,
                            product_id: editingId,
                            size: s.size,
                            mrp_variation: s.mrp_variation,
                            discount_variation: s.discount_variation,
                            selling_price: s.selling_price,
                            stock: s.stock,
                            sku: s.sku,
                        }))
                    );

                if (error) throw error;
            }


            const newSizes = form.sizes.filter(s => !s.id);

            if (newSizes.length) {
                await supabase
                    .from("product_sizes")
                    .insert(
                        newSizes.map((s, index) => ({
                            product_id: editingId,
                            size: s.size,
                            mrp_variation: s.mrp_variation,
                            discount_variation: s.discount_variation,
                            selling_price: s.selling_price,
                            stock: s.stock,
                            sku: s.sku,
                        }))
                    );
            }


            // Deletion

            const removedColorIds = originalColorIds.current.filter(
                id => !form.colors.some(c => c.id === id)
            );

            for (const id of removedColorIds) {

                const { count } = await supabase
                    .from("order_items")
                    .select("*", { count: "exact", head: true })
                    .eq("color_id", id);

                if (count > 0) {
                    alert("One or more removed colors are already used in orders and cannot be deleted.");
                    continue;
                }

                await supabase
                    .from("product_colors")
                    .delete()
                    .eq("id", id);
            }



            const removedSizeIds = originalSizeIds.current.filter(
                id => !form.sizes.some(s => s.id === id)
            );

            for (const id of removedSizeIds) {

                const { count } = await supabase
                    .from("order_items")
                    .select("*", { count: "exact", head: true })
                    .eq("size_id", id);

                if (count > 0) {
                    alert("One or more removed sizes are already used in orders and cannot be deleted.");
                    continue;
                }

                await supabase
                    .from("product_sizes")
                    .delete()
                    .eq("id", id);
            }






            alert("Product Updated ✅");
        } else {
            // const { data: product } = await supabase
            const { data: product, error } = await supabase
                .from("products")
                .insert([{
                    title: form.title,
                    slug: form.slug,
                    main_category: form.main_category,
                    sub_category: form.sub_category,
                    item_type: form.item_type,
                    description: form.description,
                    production_days: form.production_days,
                    mrp: form.mrp,
                    discount_percent: form.discount_percent,
                    selling_price: form.selling_price,
                    materials: form.materials,
                    primary_color: form.primary_color,
                    shape: form.shape,
                    pattern: form.pattern,
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

            if (error) {
                console.error(error);
                alert(error.message);
                return;
            }

            console.log(product);


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
        isDirty.current = false;
        resetForm();
    };

    useEffect(() => {
        if (!navData?.product) return;

        const { mode, product } = navData;

        const loadedProduct = {
            ...initialForm,
            ...product,

            thumbnail: product.thumbnail || "",
            images: product.images || [],

            other_colors: product.other_colors || [],
            materials: product.materials || [],
            sub_category: product.sub_category || [],
            tags: product.tags || [],

            colors: (product.colors || []).map(c => ({
                id: c.id,
                color_name: c.color_name || "",
                color_image: c.color_image || "",
            })),

            sizes: (product.sizes || []).map(s => ({
                id: s.id,
                size: s.size || "",
                mrp_variation: s.mrp_variation || "",
                discount_variation: s.discount_variation || "",
                selling_price: s.selling_price || "",
                stock: s.stock || "",
                sku: mode === "copy" ? "" : (s.sku || ""),
            })),
        };

        if (mode === "copy") {
            loadedProduct.title = `${product.title} (Copy)`;
            loadedProduct.slug = createSlug(loadedProduct.title);
            generateProductCode().then(setProductCode);
        }

        setForm(loadedProduct);
        const firstSku = loadedProduct.sizes?.[0]?.sku || "";

        const match = firstSku.match(/-([A-Z0-9]{4})-/);

        if (match) {
            setProductCode(match[1]);
        }



        originalColorIds.current = loadedProduct.colors
            .filter(c => c.id)
            .map(c => c.id);

        originalSizeIds.current = loadedProduct.sizes
            .filter(s => s.id)
            .map(s => s.id);



        setIsEditing(mode === "edit");
        setEditingId(mode === "edit" ? product.id : null);

    }, [navData]);

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


    const shouldCompressImages = () => {
        const main = form.main_category?.toLowerCase() || "";

        const hasHandKnottedMain = main.includes("hand knotted");

        const hasHandKnottedSub = (form.sub_category || []).some((sub) =>
            sub.toLowerCase().includes("hand knotted")
        );

        return !(hasHandKnottedMain || hasHandKnottedSub);
    };


    const optimizeUrl = (url) => {
        return url.replace(
            "/upload/",
            "/upload/f_auto,q_auto,w_auto/"
        );
    };

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (!isDirty.current) return;

            e.preventDefault();
            e.returnValue = "";
        };

        const handlePopState = () => {
            if (!isDirty.current) return;

            const leave = window.confirm(
                "You have unsaved changes. Are you sure you want to leave?"
            );

            if (!leave) {
                window.history.pushState(null, "", window.location.href);
            }
        };

        window.history.pushState(null, "", window.location.href);

        window.addEventListener("beforeunload", handleBeforeUnload);
        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);


    useEffect(() => {

        if (!isEditing) {

            generateProductCode().then(setProductCode);

        }

    }, [isEditing]);



    /* ---------- Upload Helpers ---------- */

    const handleThumbnailUpload = async (file) => {
        isDirty.current = true;

        if (!file) return;

        const fileToUpload = shouldCompressImages()
            ? await compressImage(file, IMAGE_RULES.thumbnail)
            : file;

        const url = await uploadImage(
            fileToUpload,
            "products/thumbnails"
        );

        setForm(prev => {

            const colors = [...prev.colors];

            // Automatically use thumbnail for first color image
            if (colors.length > 0) {
                colors[0] = {
                    ...colors[0],
                    color_image: url
                };
            }

            return {
                ...prev,
                thumbnail: url,
                colors
            };

        });

    };

    const handleGalleryUpload = async (files) => {
        isDirty.current = true;

        if (!files || files.length === 0) return;

        const urls = await Promise.all(

            [...files].map(async (file) => {

                const fileToUpload = shouldCompressImages()
                    ? await compressImage(file, IMAGE_RULES.gallery)
                    : file;

                return await uploadImage(
                    fileToUpload,
                    "products/gallery"
                );

            })

        );

        setForm(prev => ({

            ...prev,

            // Append new images instead of replacing. Duplicate images will be removed
            images: [...new Set([...prev.images, ...urls])]

        }));

    };

    const handleColorUpload = async (file, index) => {
        isDirty.current = true;

        if (!file) return;

        const fileToUpload = shouldCompressImages()
            ? await compressImage(file, IMAGE_RULES.variant)
            : file;

        const url = await uploadImage(
            fileToUpload,
            "products/variants"
        );

        setForm(prev => {

            const colors = [...prev.colors];

            colors[index] = {
                ...colors[index],
                color_image: url
            };

            return {
                ...prev,
                colors
            };

        });

    };

    return (
        <div className="container-fluid py-4 add-product-page">
            <div className="card section-card p-4">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">

                    <div>

                        <h2 className="fw-bold mb-1">
                            {isEditing ? "Edit Product" : "Add New Product"}
                        </h2>

                        <p className="text-muted mb-0">
                            Create premium handcrafted rug listings.
                        </p>

                    </div>

                    <button
                        className="btn btn-dark rounded-pill px-4 align-self-start align-self-md-auto"
                        onClick={handleSave}
                    >
                        <i className="bi bi-check-circle me-2"></i>
                        {isEditing ? "Update Product" : "Save Product"}
                    </button>

                </div>

                {/* Basic Information */}

                <div className="row mb-4">

                    <div className="col-lg-6">

                        <div className="card section-card p-4 h-100">

                            <div className="section-header">

                                <i className="bi bi-card-text"></i>

                                <div>
                                    <h5 className="mb-0 fw-bold">
                                        Basic Information
                                    </h5>

                                    <small className="text-muted">
                                        General product details
                                    </small>
                                </div>

                            </div>

                            <div className="row g-3 mt-1">

                                <div className="col-12">

                                    <label className="form-label">
                                        Product Title <span className="text-danger">*</span>
                                    </label>

                                    <input
                                        className={`form-control ${errors.title ? "is-invalid" : ""}`}
                                        name="title"
                                        value={form.title}
                                        placeholder="Enter product title"
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-12">

                                    <label className="form-label">
                                        Slug
                                    </label>

                                    <input
                                        className="form-control"
                                        name="slug"
                                        value={form.slug}
                                        placeholder="Auto Generated"
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6">

                                    <ProductSelect
                                        label="Main Category"
                                        name="main_category"
                                        value={form.main_category}
                                        options={MAIN_CATEGORIES}
                                        placeholder="Select Main Category"
                                        required
                                        error={errors.main_category}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6">

                                    <ProductSelect
                                        label="Sub Categories"
                                        name="sub_category"
                                        value={form.sub_category}
                                        options={SUB_CATEGORIES}
                                        placeholder="Select Sub Categories"
                                        required
                                        error={errors.sub_category}
                                        isMulti
                                        onChange={(selected) =>
                                            setForm(prev => ({
                                                ...prev,
                                                sub_category: selected.map(item => item.value),
                                            }))
                                        }
                                    />

                                </div>

                                <div className="col-md-6">

                                    <ProductSelect
                                        label="Item Type"
                                        name="item_type"
                                        value={form.item_type}
                                        options={ITEM_TYPES}
                                        placeholder="Select Item Type"
                                        required
                                        error={errors.item_type}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6">

                                    <ProductSelect
                                        label="Status"
                                        name="status"
                                        value={form.status}
                                        options={STATUS_OPTIONS}
                                        placeholder="Select Status"
                                        required
                                        error={errors.status}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Pricing */}

                    <div className="col-lg-6">

                        <div className="card section-card p-4 h-100">

                            <div className="section-header">

                                <i className="bi bi-cash-coin"></i>

                                <div>
                                    <h5 className="mb-0 fw-bold">
                                        Pricing
                                    </h5>

                                    <small className="text-muted">
                                        Product pricing information
                                    </small>
                                </div>

                            </div>

                            <div className="row g-3 mt-1">

                                <div className="col-md-6">

                                    <label className="form-label">
                                        Production Days <span className="text-danger">*</span>
                                    </label>

                                    <input
                                        type="number"
                                        min="1"
                                        className={`form-control ${errors.production_days ? "is-invalid" : ""}`}
                                        name="production_days"
                                        value={form.production_days}
                                        placeholder="e.g. 15"
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6">

                                    <label className="form-label">
                                        MRP ($) <span className="text-danger">*</span>
                                    </label>

                                    <input
                                        className={`form-control ${errors.mrp ? "is-invalid" : ""}`}
                                        name="mrp"
                                        value={form.mrp}
                                        placeholder="e.g. 499"
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6">

                                    <label className="form-label">
                                        Discount (%) <span className="text-danger">*</span>
                                    </label>

                                    <input
                                        className={`form-control ${errors.discount_percent ? "is-invalid" : ""}`}
                                        name="discount_percent"
                                        value={form.discount_percent}
                                        placeholder="e.g. 20"
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6">

                                    <label className="form-label">
                                        Selling Price
                                    </label>

                                    <input
                                        className={`form-control price-output ${errors.selling_price ? "is-invalid" : ""}`}
                                        value={form.selling_price}
                                        readOnly
                                        placeholder="Auto Calculated"
                                    />

                                </div>

                            </div>

                        </div>

                    </div>

                </div>





                <div className="card section-card p-4 mb-4">

                    <div className="section-header">

                        <i className="bi bi-text-paragraph"></i>

                        <div>
                            <h5 className="mb-0 fw-bold">
                                Product Description
                            </h5>

                            <small className="text-muted">
                                Highlight craftsmanship, materials, texture and care instructions.
                            </small>
                        </div>

                    </div>

                    <div className="mt-3">

                        <textarea
                            rows={12}
                            className={`form-control ${errors.description ? "is-invalid" : ""}`}
                            name="description"
                            value={form.description}
                            placeholder="Product Detailed Description"
                            onChange={handleChange}
                        />

                        <div className="d-flex justify-content-between mt-2">

                            <small className="text-muted">
                                Use blank lines to separate paragraphs and • for bullet points.
                            </small>

                            <small className="text-muted">
                                {form.description.length} characters
                            </small>

                        </div>

                    </div>

                </div>




                {/* Product Details */}

                <div className="card section-card p-4 mb-4">

                    <div className="section-header">

                        <i className="bi bi-box-seam"></i>

                        <div>
                            <h5 className="mb-0 fw-bold">
                                Product Details
                            </h5>

                            <small className="text-muted">
                                Product specifications & attributes
                            </small>
                        </div>

                    </div>

                    <div className="row g-3 mt-1">

                        <div className="col-md-6">

                            <ProductSelect
                                label="Materials"
                                name="materials"
                                value={form.materials}
                                options={MATERIALS}
                                placeholder="Select Materials"
                                required
                                error={errors.materials}
                                isMulti
                                onChange={(selected) =>
                                    setForm(prev => ({
                                        ...prev,
                                        materials: selected.map(item => item.value),
                                    }))
                                }
                            />

                        </div>

                        <div className="col-md-6">

                            <ProductSelect
                                label="Primary Color"
                                name="primary_color"
                                value={form.primary_color}
                                options={COLORS}
                                placeholder="Select Primary Color"
                                required
                                error={errors.primary_color}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="col-md-6">

                            <ProductSelect
                                label="Shape"
                                name="shape"
                                value={form.shape}
                                options={SHAPES}
                                placeholder="Select Shape"
                                onChange={handleChange}
                            />

                        </div>

                        <div className="col-md-6">

                            <ProductSelect
                                label="Pattern"
                                name="pattern"
                                value={form.pattern}
                                options={PATTERNS}
                                placeholder="Select Pattern"
                                required
                                error={errors.pattern}
                                onChange={handleChange}
                            />

                        </div>

                        <ProductSelect
                            label="Other Colors"
                            name="other_colors"
                            value={form.other_colors}
                            options={COLORS}
                            placeholder="Select Other Colors"
                            isMulti
                            onChange={(selected) =>
                                setForm((prev) => ({
                                    ...prev,
                                    other_colors: selected.map((item) => item.value),
                                }))
                            }
                        />

                        <div className="col-md-6">

                            <label className="form-label">
                                Tags
                            </label>

                            <input
                                className="form-control"
                                value={form.tags.join(",")}
                                placeholder="Separate with commas"
                                onChange={(e) => handleArrayInput(e, "tags")}
                            />

                        </div>

                        <div className="col-md-6">

                            <ProductSelect
                                label="Quality"
                                name="quality"
                                value={form.quality}
                                options={QUALITIES}
                                placeholder="Select Quality"
                                required
                                error={errors.quality}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="col-md-6">

                            <label className="form-label">
                                HSN Code <span className="text-danger">*</span>
                            </label>

                            <input
                                className={`form-control ${errors.hsn ? "is-invalid" : ""}`}
                                name="hsn"
                                value={form.hsn}
                                placeholder="Enter HSN Code"
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                </div>




                {/* Images */}

                <div className="card section-card p-4 mb-4">

                    <div className="section-header">

                        <i className="bi bi-images"></i>

                        <div>
                            <h5 className="mb-0 fw-bold">
                                Product Images
                            </h5>

                            <small className="text-muted">
                                Upload thumbnail and gallery images
                            </small>
                        </div>

                    </div>

                    <div className="row g-4">

                        {/* Thumbnail */}

                        <div className="col-lg-6">

                            <label className="form-label">
                                Thumbnail <span className="text-danger">*</span>
                            </label>

                            <ImageUploadBox
                                label="Thumbnail"
                                preview={form.thumbnail}
                                onSelect={handleThumbnailUpload}
                            />

                        </div>

                        {/* Gallery */}

                        <div className="col-lg-6">

                            <label className="form-label">
                                Gallery Images <span className="text-danger">*</span>
                            </label>

                            <>
                                <ImageUploadBox
                                    label="Gallery Images"
                                    multiple
                                    onSelect={handleGalleryUpload}
                                />

                                {form.images.length > 0 && (

                                    <div className="gallery-grid mt-3">

                                        {form.images.map((img, index) => (

                                            <div
                                                key={index}
                                                className="gallery-item"
                                            >

                                                <img
                                                    src={img}
                                                    alt=""
                                                />

                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-danger gallery-remove"
                                                    onClick={() => {

                                                        const updated = form.images.filter(
                                                            (_, i) => i !== index
                                                        );

                                                        setForm(prev => ({
                                                            ...prev,
                                                            images: updated
                                                        }));

                                                    }}
                                                >
                                                    <i className="bi bi-x"></i>
                                                </button>

                                            </div>

                                        ))}

                                    </div>

                                )}
                            </>

                        </div>

                    </div>

                </div>




                {/* Color Variations */}

                <div className="card section-card p-4 mb-4">

                    <div className="section-header">

                        <i className="bi bi-palette"></i>

                        <div>
                            <h5 className="mb-0 fw-bold">
                                Color Variations
                            </h5>

                            <small className="text-muted">
                                Add available product colors
                            </small>
                        </div>

                    </div>

                    <div className="row g-3">

                        {form.colors.map((c, i) => (

                            <div className="col-12 col-sm-6 col-lg-4 col-xl-3">

                                <div key={i} className="border rounded-4 p-4 mb-3 bg-light">

                                    <div className="d-flex flex-column gap-3">

                                        <div>

                                            <ProductSelect
                                                label="Color Name"
                                                name="color_name"
                                                value={c.color_name}
                                                options={COLORS}
                                                placeholder="Select Color"
                                                onChange={(e) => handleColorChange(i, e)}
                                            />

                                        </div>

                                        <div>

                                            <label className="form-label">
                                                Color Image
                                            </label>

                                            <ImageUploadBox
                                                preview={c.color_image}
                                                onSelect={(file) => handleColorUpload(file, i)}
                                            />

                                        </div>

                                        <div className="text-end">

                                            <button
                                                type="button"
                                                className="btn btn-outline-danger w-100"
                                                onClick={() => removeColor(i)}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>

                                        </div>

                                    </div>

                                </div>
                            </div>

                        ))}
                    </div>

                    <button
                        className="btn btn-outline-dark rounded-pill w-100 w-sm-auto"
                        onClick={addColor}
                    >
                        <i className="bi bi-plus-circle me-2"></i>

                        Add Another Color
                    </button>

                </div>




                {/* Size Variations */}

                < div className="card section-card p-4 mb-4" >

                    <div className="section-header">

                        <i className="bi bi-rulers"></i>

                        <div>
                            <h5 className="mb-0 fw-bold">
                                Size Variations
                            </h5>

                            <small className="text-muted">
                                Configure available sizes, pricing & inventory
                            </small>
                        </div>

                    </div>
                    <div>




                        {
                            form.sizes.map((s, i) => (

                                <div
                                    key={s.id || `new-${i}`}
                                >

                                    <div className="card h-100 border-0 shadow-sm section-card p-3">

                                        <div className="row g-3">

                                            <div className="col-md-3">

                                                <label className="form-label">
                                                    Size
                                                </label>

                                                <input
                                                    className="form-control"
                                                    name="size"
                                                    value={s.size}
                                                    placeholder="e.g. 5 × 7 ft"
                                                    onChange={(e) => handleSizeChange(i, e)}
                                                />

                                            </div>

                                            <div className="col-md-1">

                                                <label className="form-label">
                                                    MRP ($)
                                                </label>

                                                <input
                                                    className="form-control"
                                                    name="mrp_variation"
                                                    value={s.mrp_variation}
                                                    placeholder="MRP"
                                                    onChange={(e) => handleSizeChange(i, e)}
                                                />

                                            </div>

                                            <div className="col-md-2">

                                                <label className="form-label">
                                                    Discount (%)
                                                </label>

                                                <input
                                                    className="form-control"
                                                    name="discount_variation"
                                                    value={s.discount_variation}
                                                    placeholder="Discount"
                                                    onChange={(e) => handleSizeChange(i, e)}
                                                />

                                            </div>

                                            <div className="col-md-2">

                                                <label className="form-label">
                                                    Selling Price
                                                </label>

                                                <input
                                                    className="form-control price-output"
                                                    value={s.selling_price}
                                                    readOnly
                                                    placeholder="Auto Calculated"
                                                />

                                            </div>

                                            <div className="col-md-1">

                                                <label className="form-label">
                                                    Stock
                                                </label>

                                                <input
                                                    className="form-control"
                                                    name="stock"
                                                    value={s.stock}
                                                    placeholder="Stock"
                                                    onChange={(e) => handleSizeChange(i, e)}
                                                />

                                            </div>

                                            <div className="col-md-2">

                                                <label className="form-label">
                                                    SKU
                                                </label>

                                                <input
                                                    className="form-control"
                                                    name="sku"
                                                    value={s.sku}
                                                    placeholder="Unique SKU"
                                                    onChange={(e) => handleSizeChange(i, e)}
                                                />

                                            </div>

                                            <div className="col-lg-1 d-flex align-items-end">

                                                <button type="button" className="btn w-10" onClick={() => removeSize(i)}>
                                                    <i className="bi bi-trash me-2"></i>
                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            ))
                        }
                    </div>

                    < button
                        className="btn btn-outline-dark rounded-pill"
                        onClick={addSize}
                    >
                        <i className="bi bi-plus-circle me-2"></i>
                        Add Another Size
                    </button>

                </div>




            </div>
        </div>
    );
}