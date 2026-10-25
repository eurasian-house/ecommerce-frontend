
import LazySection from "../components/LazySection";
import SEO from "../components/SEO";

import CustomRugsHero from "../components/custom-rugs/CustomRugsHero";
import CustomizationShowcase from "../components/custom-rugs/CustomizationShowcase";
import CraftsmanshipInMotion from "../components/custom-rugs/CraftsmanshipInMotion";
import DesignYourOwn from "../components/custom-rugs/DesignYourOwn";
import PersonalizedRugs from "../components/custom-rugs/PersonalizedRugs";
import OurProcess from "../components/custom-rugs/OurProcess";
import CustomRugGallery from "../components/custom-rugs/CustomRugGallery";
import CustomRugsFAQ from "../components/custom-rugs/CustomRugsFAQ";
import CustomRugsCTA from "../components/custom-rugs/CustomRugsCTA";

import "../styles/pages/CustomRugs.css";

export default function CustomRugs() {
    return (
        <>
            <SEO
                title="Custom Rugs | Design Your Own Handmade Rug | Eurasian House"
                description="Create your own handmade rug with Eurasian House. Customize materials, colors, patterns, weaving techniques, sizes, shapes and personalized designs."
                canonical="https://www.eurasianrugs.com/custom-rugs"
            />

            <main className="custom-rugs-page">
                <CustomRugsHero />

                <LazySection minHeight={700}>
                    <CustomizationShowcase />
                </LazySection>

                <LazySection minHeight={500}>
                    <CraftsmanshipInMotion />
                </LazySection>

                <LazySection minHeight={600}>
                    <DesignYourOwn />
                </LazySection>

                <LazySection minHeight={500}>
                    <PersonalizedRugs />
                </LazySection>

                <LazySection minHeight={450}>
                    <OurProcess />
                </LazySection>

                <LazySection minHeight={650}>
                    <CustomRugGallery />
                </LazySection>

                <LazySection minHeight={500}>
                    <CustomRugsFAQ />
                </LazySection>

                <CustomRugsCTA />
            </main>
        </>
    );
}
