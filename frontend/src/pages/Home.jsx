import React from "react";
import Hero from "../components/Hero";
import Reviews from "../components/Reviews";
import Boxes from "../components/Boxes";
import PopularDestination from "../components/PopularDestination";
import Guides from "../components/Guides";

const Home = () => {
  return (
    <div className="overflow-x-hidden min-h-screen">
      <Hero />
      <PopularDestination
        title="Top Tourist Attractions"
        subtitle="Must-visit destinations in India"
      />
      <PopularDestination
        title="Heritage Sites"
        subtitle="Explore India's rich cultural heritage"
      />
      <PopularDestination
        title="Natural Wonders"
        subtitle="Discover breathtaking landscapes"
      />
      <PopularDestination
        title="Religious Destinations"
        subtitle="Sacred places of spiritual significance"
      />
      <Boxes />
      <Reviews />
      <Guides />
    </div>
  );
};

export default Home;
