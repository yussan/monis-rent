export interface RentalItem {
  id: string;
  group_id: string;
  name: string;
  pricePerDay: number;
  imagePrev: string;
  imageThumb: string;
  description: string;
  dimensions?: string;
  material?: string;
  availableStock: number;
}

export interface CategoryGroup {
  id: string;
  label: string;
}
