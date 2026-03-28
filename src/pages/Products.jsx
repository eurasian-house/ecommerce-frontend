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

export default function Products() {
  const [products, setProducts] = useState([]);
  const [colorFilter, setColorFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        product_colors (*),
        product_sizes (*)
      `);

    if (error) return alert(error.message);

    setProducts(data);
  };

  const handleCarouselClick = (value) => {
    navigate(`/products?discount=${value}`);
  };

  return (
    <div className="container mt-4">
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
              onClick={() => navigate(`/products/${p.id}`)}
            />
          ))}
      </div>

      {/* EXTRA SECTIONS */}
      <ForUser />
      <PriceUnder />
      <TopDeals />
      <IdeasSection />
      <Inspiration />

    </div>
  );
}