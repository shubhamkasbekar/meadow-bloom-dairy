
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

interface CategoryCardProps {
  name: string;
  image: string;
  link: string;
}

export default function CategoryCard({ name, image, link }: CategoryCardProps) {
  return (
    <Link to={link}>
      <Card className="overflow-hidden h-full transition-transform duration-200 hover:shadow-lg hover:-translate-y-1">
        <div className="h-40 overflow-hidden relative">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
          />
          <div className="absolute inset-0 bg-black opacity-20 hover:opacity-10 transition-opacity"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="text-2xl font-bold text-white shadow-text">{name}</h3>
          </div>
        </div>
        <CardContent className="p-4 bg-dairy-green">
          <p className="text-center font-medium">View All {name} Products</p>
        </CardContent>
      </Card>
    </Link>
  );
}
