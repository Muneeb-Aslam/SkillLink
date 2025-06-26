import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar";
import Hero from "./components/landing/Hero";
import Category from "./components/landing/category";
import GettingStart from "./components/landing/gettingstart";
import Reviews from "./components/landing/reviews";
import FeatureProjects from "./components/landing/featureprojects";
import { Metadata } from "next";
// import { PageLoading } from "./components/PageLoading";

export const metadata: Metadata = {
  title: "Skill Link",
  description: "A Freelancing Web App",
};

export default async function Home() {
  return (
    <>
      {/* <PageLoading></PageLoading> */}
      <Navbar />
      <Hero />
      <Category />
      <GettingStart />
      <FeatureProjects />
      <Reviews />
      <Footer />
    </>
  );
}
