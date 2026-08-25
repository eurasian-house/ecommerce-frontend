// import { useEffect, useState, useRef } from "react";
// import ProductCard from "./ProductCard";
// import "../styles/components/SmallComponent.css";

// export default function RecentlyViewed() {
//     const [products, setProducts] = useState([]);
//     const scrollRef = useRef(null);

//     useEffect(() => {
//         const loadRecentlyViewed = () => {
//             try {
//                 const stored = JSON.parse(
//                     localStorage.getItem("recentlyViewedProducts") || "[]"
//                 );

//                 setProducts(stored);
//             } catch (error) {
//                 console.log("Recently viewed load error:", error);
//                 setProducts([]);
//             }
//         };

//         loadRecentlyViewed();
//     }, []);

//     // Don't render anything until at least one product has been viewed
//     if (products.length === 0) {
//         return null;
//     }

//     const optimizeUrl = (url) => {
//         if (!url?.includes("/upload/")) return url;

//         return url.replace(
//             "/upload/",
//             "/upload/f_auto,q_auto,dpr_auto,c_limit,w_auto/"
//         );
//     };

//     const scrollLeft = () => {
//         scrollRef.current?.scrollBy({
//             left: -350,
//             behavior: "smooth",
//         });
//     };

//     const scrollRight = () => {
//         scrollRef.current?.scrollBy({
//             left: 350,
//             behavior: "smooth",
//         });
//     };

//     return (
//         <section className="top-deals-section">

//             <div className="container-fluid">

//                 <div className="text-center top-deals-header">

//                     <div className="discount-ornament mt-4">

//                         <span className="ornament-line"></span>

//                         <span className="ornament-text">
//                             Recently Viewed
//                         </span>

//                         <span className="ornament-line"></span>

//                     </div>

//                     <h2 className="mt-3 fw-semibold for-user-heading">
//                         Pick Up Where You Left Off
//                     </h2>

//                     <p className="for-user-subheading mx-auto my-4">
//                         Revisit the handcrafted rugs you've recently explored.
//                     </p>

//                 </div>

//                 <div className="position-relative">

//                     <button
//                         className="category-arrow category-arrow-left d-none d-md-flex"
//                         onClick={scrollLeft}
//                         type="button"
//                     >
//                         ‹
//                     </button>

//                     <div
//                         ref={scrollRef}
//                         className="d-flex overflow-auto gap-3 pb-2 category-scroll"
//                     >
//                         {products.map((product) => (
//                             <ProductCard
//                                 key={product.id}
//                                 product={{
//                                     ...product,
//                                     thumbnail: optimizeUrl(product.thumbnail),
//                                 }}
//                                 cardWidth="185px"
//                             />
//                         ))}
//                     </div>

//                     <button
//                         className="category-arrow category-arrow-right d-none d-md-flex"
//                         onClick={scrollRight}
//                         type="button"
//                     >
//                         ›
//                     </button>

//                 </div>

//             </div>

//         </section>
//     );
// }



import { useEffect, useState, useRef } from "react";
import ProductCard from "./ProductCard";
import "../styles/components/SmallComponent.css";

export default function RecentlyViewed() {
    const [products, setProducts] = useState([]);
    const scrollRef = useRef(null);

    useEffect(() => {
        try {
            const stored = JSON.parse(
                localStorage.getItem("recentlyViewedProducts") || "[]"
            );

            setProducts(stored);
        } catch (error) {
            console.log("Recently viewed load error:", error);
            setProducts([]);
        }
    }, []);

    const optimizeUrl = (url) => {
        if (!url?.includes("/upload/")) return url;

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
                            Recently Viewed
                        </span>

                        <span className="ornament-line"></span>

                    </div>

                    <h2 className="mt-3 fw-semibold for-user-heading">
                        Pick Up Where You Left Off
                    </h2>

                    <p className="for-user-subheading mx-auto my-4">
                        Revisit the handcrafted rugs you've recently explored.
                    </p>

                </div>

                <div className="position-relative">

                    {products.length === 0 ? (

                        <div className="text-center py-4">
                            <p className="mb-0">
                                No Recently Seen Item
                            </p>
                        </div>

                    ) : (

                        <>
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
                        </>

                    )}

                </div>

            </div>

        </section>
    );
}