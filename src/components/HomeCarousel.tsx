import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CarouselItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface HomeCarouselProps {
  items: CarouselItem[];
}

export default function HomeCarousel({ items }: HomeCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [items.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  };

  return (
    <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
      {/* Carousel items */}
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
            index === currentIndex
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-full"
          }`}
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-30"></div>
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white p-6 max-w-lg">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in text-white">
                {item.title}
              </h2>
              <p className="text-xl md:text-2xl mb-8 animate-slide-in">
                {item.description}
              </p>
              <Button
                className="bg-dairy-accent hover:bg-dairy-brown text-white"
                size="lg"
              >
                Shop Now
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <Button
        variant="ghost"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full bg-white/30 text-white hover:bg-white/50 p-2"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full bg-white/30 text-white hover:bg-white/50 p-2"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentIndex ? "w-6 bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
}
