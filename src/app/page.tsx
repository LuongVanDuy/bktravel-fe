import Benefits from "@/components/Home/Benefits";
import HeroBanner from "@/components/Home/HeroBanner";
import MostPopularPlaces from "@/components/Home/MostPopularPlaces";
import Partner from "@/components/Home/Partner";
import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroBanner />
      <Partner />
      <Benefits />
      <MostPopularPlaces />
      <Footer />
    </>
  );
}
