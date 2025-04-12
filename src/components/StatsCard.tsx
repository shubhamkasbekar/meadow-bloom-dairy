
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  value: string;
  label: string;
  icon: React.ReactNode;
}

export default function StatsCard({ value, label, icon }: StatsCardProps) {
  return (
    <Card className="bg-white border border-dairy-light-accent">
      <CardContent className="p-6 flex items-center">
        <div className="bg-dairy-accent rounded-full p-3 text-white mr-4">
          {icon}
        </div>
        <div>
          <p className="text-3xl font-bold">{value}</p>
          <p className="text-gray-600">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}
