import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

import HeroCarousel from "./HeroCarousel";
import ForUser from "../components/ForUser";
import PriceUnder from "../components/PriceUnder";
import TopDeals from "../components/TopDeals";
import IdeasSection from "../components/IdeasSection";

import Category from "../components/Category";
import Discount from "../components/Discount";
import Colors from "../components/Colors";
import ProductCard from "../components/ProductCard";
import Inspiration from "../components/Inspiration";
import { applyActiveFilter } from "../utils/productQueries";

import SEO from "../components/SEO";
import { organizationSchema, websiteSchema } from "../seo/schemas";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [colorFilter, setColorFilter] = useState("");
  const [selectedImages, setSelectedImages] = useState({});
  const navigate = useNavigate();

  // pagination
  const [page, setPage] = useState(1);
  const limit = 10;
  const [total, setTotal] = useState(0);
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const fetchProducts = async () => {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from("products")
      .select(`
      *,
      product_colors (*),
      product_sizes (*)
    `, { count: "exact" })
      .order("created_at", { ascending: false });

    query = applyActiveFilter(query); // ✅ active only

    // const { data, error } = await query.range(from, to);
    const { data, count, error } = await query
      .range(from, to);

    if (error) return alert(error.message);

    setProducts(data || []);
    setTotal(count || 0);

    const imgs = {};

    (data || []).forEach((p) => {
      imgs[p.id] = p.thumbnail;
    });

    setSelectedImages(imgs);
  };

  const handleCarouselClick = (value) => {
    navigate(`/products?discount=${value}`);
  };


  return (
    <>
      <SEO
        title="Handmade Rugs & Carpets | Eurasian House"
        description="Shop premium handmade rugs, Persian carpets, Kilims, Dhurries, Tibetan rugs, Jute rugs and more. Crafted with timeless elegance."
        canonical="https://eurasianrugs.com/"
        schema={[
          organizationSchema,
          websiteSchema,
        ]}
      />


      <div className="container-fluid px-0">
        <Category />
        <HeroCarousel onSlideClick={handleCarouselClick} />
        <Discount />
        <Colors
          colorFilter={colorFilter}
          setColorFilter={setColorFilter}
        />

        {/* PRODUCT LIST */}
        <div className="d-flex overflow-auto gap-3 pb-2">
          {products
            .filter((p) =>
              colorFilter
                ? p.product_colors?.some(
                  (c) =>
                    c.color_name?.toLowerCase() ===
                    colorFilter.toLowerCase()
                )
                : true
            )
            .map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                selectedImage={selectedImages[p.id]}
                onClick={() => navigate(`/products/${p.slug}`)}
                onColorClick={(id, img) =>
                  setSelectedImages((prev) => ({
                    ...prev,
                    [id]: img,
                  }))
                }
              />
            ))}
        </div>
        <div className="d-flex justify-content-center mt-3 gap-2">
          <button
            className="btn btn-outline-dark btn-sm"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
          >
            Prev
          </button>

          <button
            className="btn btn-dark btn-sm"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>

        {/* EXTRA SECTIONS */}
        <ForUser />
        <PriceUnder />
        <TopDeals />
        <IdeasSection />
        <Inspiration />

      </div>
    </>

  );
}