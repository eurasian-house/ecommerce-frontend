import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

import LazySection from "../components/LazySection";
import HeroCarousel from "./HeroCarousel";
import ForUser from "../components/ForUser";
import PriceUnder from "../components/PriceUnder";
import TopDeals from "../components/TopDeals";
import RecentAdded from "../components/RecentAdded";
import RecentlyViewed from "../components/RecentlyViewed";
import IdeasSection from "../components/IdeasSection";

import Category from "../components/Category";
import Discount from "../components/Discount";
import Colors from "../components/Colors";
import ProductCard from "../components/ProductCard";
import Inspiration from "../components/Inspiration";

import CustomRugsPreview from "../components/CustomRugsPreview";
import WhyChooseUs from "../components/WhyChooseUs";
import ShopWithConfidence from "../components/ShopWithConfidence";
import CustomerInspiration from "../components/CustomerInspiration";
import LoomToLiving from "../components/LoomToLiving";
import RugInspirationSlider from "../components/RugInspirationSlider";
import OurPromise from "../components/OurPromise";
import BrandStory from "../components/BrandStory";
import WholesaleHeroCTA from "../components/WholesaleHeroCTA";

import { applyActiveFilter } from "../utils/productQueries";
import SEO from "../components/SEO";
import { organizationSchema, websiteSchema } from "../seo/schemas";


export default function Products() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [colorFilter, setColorFilter] = useState("");
  const displayProducts = colorFilter ? allProducts : products;
  const [selectedImages, setSelectedImages] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // pagination
  const [page, setPage] = useState(1);
  const limit = 10;
  const [total, setTotal] = useState(0);
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    fetchProducts();
  }, [page, colorFilter]);

  const fetchProducts = async () => {
    setLoading(true);

    try {
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      let query = supabase
        .from("products")
        .select(
          `
          *,
          product_colors (*),
          product_sizes (*)
        `,
          { count: "exact" }
        )
        .order("created_at", { ascending: false });

      query = applyActiveFilter(query);

      if (colorFilter) {
        const { data, error } = await query;

        if (error) throw error;

        setAllProducts(data || []);
      } else {
        const { data, count, error } = await query.range(from, to);

        if (error) throw error;

        setProducts(data || []);
        setTotal(count || 0);

        const imgs = {};

        (data || []).forEach((p) => {
          imgs[p.id] = p.thumbnail;
        });

        setSelectedImages(imgs);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCarouselClick = (value) => {
    navigate(`/products`);
  };


  return (
    <>
      <SEO
        title="Handmade Rugs & Carpets | Eurasian House"
        description="Shop premium handmade rugs, hand knotted rugs, hand tufted rugs, Persian carpets, Kilims, Dhurries, Tibetan rugs, Jute rugs and more. Crafted with timeless elegance."
        canonical="https://www.eurasianrugs.com/"
        schema={[
          organizationSchema,
          websiteSchema,
        ]}
      />


      <div className="container-fluid px-0">
        <Category />
        <HeroCarousel onSlideClick={handleCarouselClick} />
        <LazySection minHeight={350}>
          <CustomerInspiration />
        </LazySection>
        <WholesaleHeroCTA />
        <LazySection minHeight={350}>
          <RecentAdded />
        </LazySection>
        <Discount />
        {/* ========== HOME PAGE COLOUR SECTION: START ========== */}

        <Colors
          colorFilter={colorFilter}
          setColorFilter={setColorFilter}
        />

        {/* Filter products using the existing fetched data */}
        {(() => {
          const filteredProducts = displayProducts.filter((product) => {
            if (!colorFilter) return true;

            return product.product_colors?.some(
              (color) =>
                color.color_name?.trim().toLowerCase() ===
                colorFilter.trim().toLowerCase()
            );
          });

          return (
            <>
              {/* Product loading skeleton */}
              {loading ? (
                <div
                  className="home-products-row d-flex overflow-hidden gap-3 pb-2"
                  aria-label="Loading products"
                  aria-busy="true"
                >
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div className="home-product-skeleton" key={index}>
                      <div className="home-product-skeleton__image" />
                      <div className="home-product-skeleton__line" />
                      <div className="home-product-skeleton__line home-product-skeleton__line--short" />
                    </div>
                  ))}
                </div>
              ) : filteredProducts.length === 0 ? (
                /* No products message */
                <div className="home-products-empty text-center py-5">
                  <i className="bi bi-search" />
                  <h4>No products found</h4>
                  <p>
                    {colorFilter
                      ? `We couldn't find any rugs in ${colorFilter}. Try another colour.`
                      : "There are no products available right now. Please check again later."}
                  </p>

                  {colorFilter && (
                    <button
                      type="button"
                      className="btn-primary mt-3"
                      onClick={() => setColorFilter("")}
                    >
                      View All Colours
                    </button>
                  )}
                </div>
              ) : (
                /* Products */
                <div className="d-flex overflow-auto gap-3 pb-2">
                  {filteredProducts.map((p) => (
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
              )}

              {/* Pagination: unchanged */}
              {!colorFilter && !loading && total > 0 && (
                <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
                  <button
                    type="button"
                    className="btn-secondary"
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  >
                    <i className="bi bi-arrow-left" />
                    Previous
                  </button>

                  <button
                    type="button"
                    className="btn-primary"
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    Next
                    <i className="bi bi-arrow-right" />
                  </button>
                </div>
              )}
            </>
          );
        })()}

        {/* ========== HOME PAGE COLOUR SECTION: END ========== */}

        {/* EXTRA SECTIONS */}
        <LazySection minHeight={350}>
          <ForUser />
        </LazySection>
        <LazySection minHeight={350}>
          <PriceUnder />
        </LazySection>
        <LazySection minHeight={350}>
          <TopDeals />
        </LazySection>
        <LazySection minHeight={450}>
          <WhyChooseUs />
        </LazySection>
        <LazySection minHeight={450}>
          <RecentlyViewed />
        </LazySection>

        <LazySection minHeight={450}>
          <ShopWithConfidence />
        </LazySection>
        <LazySection minHeight={650}>
          <RugInspirationSlider />
        </LazySection>
        <LazySection minHeight={350}>
          <LoomToLiving />
        </LazySection>
        <LazySection minHeight={350}>
          <OurPromise />
        </LazySection>
        <LazySection minHeight={350}>
          <CustomRugsPreview />
        </LazySection>
        <LazySection minHeight={350}>
          <BrandStory />
        </LazySection>
        <LazySection minHeight={350}>
          <IdeasSection />
        </LazySection>
        <LazySection minHeight={350}>
          <Inspiration />
        </LazySection>

      </div>
    </>

  );
}