import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { MapPin, Bed, Bath, Square } from "lucide-react";

const PropertyOverview = () => {
  return (
    <Card className="h-[270px] flex flex-col">
      <div className="p-4 flex-1 overflow-y-auto">
        <h3 className="text-lg font-semibold text-foreground mb-3">Your Property</h3>
        
        <div className="space-y-3">
        <div className="h-24 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          <Building2 className="h-10 w-10 text-muted-foreground" />
        </div>
        
        <div>
          <h4 className="font-semibold text-foreground mb-1">Apartment 304</h4>
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
            <MapPin className="h-4 w-4" />
            <span>123 Main Street, Downtown, CA 90210</span>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="flex items-center gap-1 p-2 rounded-lg bg-secondary">
              <Bed className="h-4 w-4 text-primary" />
              <span className="text-sm text-foreground">2 Beds</span>
            </div>
            <div className="flex items-center gap-1 p-2 rounded-lg bg-secondary">
              <Bath className="h-4 w-4 text-primary" />
              <span className="text-sm text-foreground">2 Bath</span>
            </div>
            <div className="flex items-center gap-1 p-2 rounded-lg bg-secondary">
              <Square className="h-4 w-4 text-primary" />
              <span className="text-sm text-foreground">950 sqft</span>
            </div>
          </div>
          
          <Button className="w-full" variant="outline" size="sm">
            View Details
          </Button>
        </div>
      </div>
      </div>
    </Card>
  );
};

// Simple Building icon for the placeholder
const Building2 = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

export default PropertyOverview;