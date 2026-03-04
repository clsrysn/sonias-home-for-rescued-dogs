import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface DogCardProps {
  id: string;
  image: string;
  name: string;
  age: string;
  description: string;
  adopted?: boolean;
  decreased?: boolean;
}

const DogCard = ({ id, image, name, age, description, adopted, decreased }: DogCardProps) => {
  return (
    <div className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {decreased ? (
          <Badge className="absolute top-3 right-3 bg-black text-white border-0 font-bold">
            Decreased
          </Badge>
        ) : adopted && (
          <Badge className="absolute top-3 right-3 bg-success text-success-foreground border-0 font-bold">
            Adopted
          </Badge>
        )}
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg text-foreground">{name}</h3>
          <span className="text-xs text-muted-foreground font-body">{age}</span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        <Link to={`/dog/${id}`}>
          <Button
            variant={decreased ? "decreased" : adopted ? "adopted" : "default"}
            size="sm"
            className="w-full mt-2"
          >
            More Information
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DogCard;
