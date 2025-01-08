import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import img1 from "./../assets/images/img1.jpg";
import img2 from "./../assets/images/img2.jpg";
import img3 from "./../assets/images/img3.jpg";
import img4 from "./../assets/images/img4.jpg";
import img5 from "./../assets/images/img5.jpg";
import Header from "./Header";
const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Use placeholder images since we can't import local images
  const images = [img1, img2, img3, img4, img5];

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % images.length);
    setTimeout(() => setIsAnimating(false), 5000);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsAnimating(false), 5000);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[640px] overflow-hidden bg-black">
      <Header />
      {/* Main Slider */}
      <div className="relative w-full h-full">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-all duration-500 ease-in-out ${
              index === currentSlide
                ? "opacity-100 transform scale-100"
                : "opacity-0 transform scale-105"
            }`}
          >
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
          </div>
        ))}

        {/* Navigation Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>

        {/* Next/Previous Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm transition-all duration-300 z-20"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        {/* Next Slide Preview */}
        <div
          className="absolute right-8 top-1/2 -translate-y-1/2 group cursor-pointer z-20"
          onClick={nextSlide}
        >
          <div className="w-64 h-40 overflow-hidden rounded-lg shadow-lg transition-transform duration-300 transform group-hover:scale-105">
            <img
              src={images[(currentSlide + 1) % images.length]}
              alt="Next slide"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] group-hover:bg-black/20 transition-all duration-300">
              <div className="absolute inset-0 flex items-center justify-center">
                <ChevronRight className="w-8 h-8 text-white transform group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          </div>
          {/* <div className="absolute -bottom-8 left-0 right-0 text-center text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Next
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
