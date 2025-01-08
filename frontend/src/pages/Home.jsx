import React from "react";
import Hero from "../components/Hero";
// import Boxes from "./../Boxes";
import Reviews from "../components/Reviews";
import Boxes from "../components/Boxes";
import PopularDestination from "../components/PopularDestination";
const Home = () => {
  return (
    <div>
      <Hero />
      <PopularDestination />
      <Boxes />
      <Reviews />
    </div>
  );
};

export default Home;
