import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import {
    FaHome,
    FaShoppingBag,
    FaCompass,
} from "react-icons/fa";

import "../styles/pages/NotFound.css";

export default function NotFound() {

    return (
        <>
            <SEO
                title="404 - Page Not Found | Eurasian House"
                description="The page you're looking for could not be found."
                canonical="https://www.eurasianrugs.com/404"
            />

            <section className="not-found-page">

                <div className="container">

                    <div className="not-found-wrapper">

                        <span className="not-found-badge">

                            <FaCompass />

                            Lost?

                        </span>

                        <h1 className="not-found-code">

                            404

                        </h1>

                        <h2 className="not-found-title">

                            Oops! Page Not Found

                        </h2>

                        <p className="not-found-text">

                            The page you're looking for may have been moved,
                            removed, renamed, or the URL may be incorrect.
                            Let's help you get back on track.

                        </p>

                        <div className="not-found-actions">

                            <Link
                                to="/"
                                className="btn not-found-btn-primary"
                            >

                                <FaHome />

                                Home

                            </Link>

                            <Link
                                to="/products"
                                className="btn not-found-btn-secondary"
                            >

                                <FaShoppingBag />

                                Continue Shopping

                            </Link>

                        </div>

                        <div className="not-found-help">

                            <span>
                                Need assistance?
                            </span>

                            <Link
                                to="/contact"
                                className="not-found-link"
                            >
                                Contact Support
                            </Link>

                        </div>

                    </div>

                </div>

            </section>

        </>
    );

}