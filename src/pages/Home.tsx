import HomeCarousel from "../components/HomeCarousel";
import CategoryCard from "../components/CategoryCard";
import TestimonialCard from "../components/TestimonialCard";
import FeatureCard from "../components/FeatureCard";
import StatsCard from "../components/StatsCard";
import { Button } from "@/components/ui/button";
import { carouselItems, testimonials, whyChooseUs } from "../data/mockData";
import { Link } from "react-router-dom";
import { CalendarDays, ShoppingBag, MapPin } from "lucide-react";

export default function Home() {
  // Category data
  const categories = [
    {
      name: "Milk",
      image:
        "https://raw.githubusercontent.com/shubhamkasbekar/meadow-bloom-dairy/refs/heads/main/src/assets/images/Milk.jpg",
      link: "/products?category=milk",
    },
    {
      name: "Shrikhand",
      image:
        "https://raw.githubusercontent.com/shubhamkasbekar/meadow-bloom-dairy/refs/heads/main/src/assets/images/Shrikhand.jpg",
      link: "/products?category=shrikhand",
    },
    {
      name: "Amrakhand",
      image:
        "https://raw.githubusercontent.com/shubhamkasbekar/meadow-bloom-dairy/refs/heads/main/src/assets/images/amrakhand.jpg",
      link: "/products?category=drinks",
    },
    {
      name: "Others",
      image:
        "https://raw.githubusercontent.com/shubhamkasbekar/meadow-bloom-dairy/refs/heads/main/src/assets/images/slider-4.jpg",
      link: "/products?category=others",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <HomeCarousel items={carouselItems} />

      {/* Product Categories Section */}
      <section className="py-16 bg-dairy-cream">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Product Categories
          </h2>
          <p className="text-center text-gray-600 mb-10">
            Explore our range of farm-fresh dairy products
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <CategoryCard
                key={index}
                name={category.name}
                image={category.image}
                link={category.link}
              />
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              asChild
              className="bg-dairy-accent hover:bg-dairy-mid-primary text-white"
              size="lg"
            >
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Why Choose Us?
          </h2>
          <p className="text-center text-gray-600 mb-10">
            Our commitment to quality makes us different
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((feature) => (
              <FeatureCard
                key={feature.id}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-dairy-primary text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Here We Are
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard
              value="75+"
              label="Years in the Industry"
              icon={<CalendarDays className="h-6 w-6" />}
            />
            <StatsCard
              value="100K+"
              label="Products Sold"
              icon={<ShoppingBag className="h-6 w-6" />}
            />
            <StatsCard
              value="5"
              label="Branches"
              icon={<MapPin className="h-6 w-6" />}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            What Our Customers Say
          </h2>
          <p className="text-center text-gray-600 mb-10">
            Join thousands of satisfied customers
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                name={testimonial.name}
                role={testimonial.role}
                content={testimonial.content}
                avatar={testimonial.avatar}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
