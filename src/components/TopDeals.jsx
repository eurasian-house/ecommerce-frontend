import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabase";
import ProductCard from "./ProductCard";
import "../styles/components/SmallComponent.css";


export default function TopDeals() {
    const [products, setProducts] = useState([]);
    const scrollRef = useRef(null);

    useEffect(() => {
        fetchTopDeals();
    }, []);

    const fetchTopDeals = async () => {
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .eq("status", "active") // recommended
            .order("clicks", { ascending: false })
            .limit(10);

        if (error) {
            console.log(error);
            return;
        }

        setProducts(data || []);
    };

    const optimizeUrl = (url) => {
        if (!url.includes("/upload/")) return url;

        return url.replace(
            "/upload/",
            "/upload/f_auto,q_auto,dpr_auto,c_limit,w_auto/"
        );
    };

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({
            left: -350,
            behavior: "smooth",
        });
    };

    const scrollRight = () => {
        scrollRef.current?.scrollBy({
            left: 350,
            behavior: "smooth",
        });
    };

    return (
        <section className="top-deals-section">

            <div className="container-fluid">

                <div className="text-center top-deals-header">

                    <div className="discount-ornament mt-4">

                        <span className="ornament-line"></span>

                        <span className="ornament-text">
                            Featured Deal
                        </span>

                        <span className="ornament-line"></span>

                    </div>

                    <h2 className="mt-3 fw-semibold for-user-heading">
                        Exceptional Finds, Exceptional Value
                    </h2>

                    <p className="for-user-subheading mx-auto my-4">
                        Discover our <span className="top-10">Top 10</span> handcrafted rugs loved by
                        customers worldwide.
                    </p>

                </div>

                <div className="position-relative">

                    <button
                        className="category-arrow category-arrow-left d-none d-md-flex"
                        onClick={scrollLeft}
                        type="button"
                    >
                        ‹
                    </button>

                    <div
                        ref={scrollRef}
                        className="d-flex overflow-auto gap-3 pb-2 category-scroll"
                    >
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={{
                                    ...product,
                                    thumbnail: optimizeUrl(product.thumbnail),
                                }}
                                cardWidth="185px"
                            />
                        ))}
                    </div>

                    <button
                        className="category-arrow category-arrow-right d-none d-md-flex"
                        onClick={scrollRight}
                        type="button"
                    >
                        ›
                    </button>

                </div>

            </div>

        </section>
    );
}