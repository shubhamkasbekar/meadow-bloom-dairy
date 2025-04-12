
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Leaf,
  Heart,
  History,
  Check,
  LucideIcon,
} from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
  // Map string icon names to Lucide components
  const iconMap: { [key: string]: LucideIcon } = {
    Leaf: Leaf,
    Heart: Heart,
    History: History,
    Check: Check,
  };

  const IconComponent = iconMap[icon] || Leaf;

  return (
    <Card className="h-full bg-dairy-green hover:shadow-md transition-shadow">
      <CardContent className="p-6 text-center">
        <div className="mb-4 mx-auto bg-dairy-accent text-white rounded-full p-3 w-fit">
          <IconComponent className="h-6 w-6" />
        </div>
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </CardContent>
    </Card>
  );
}
