export interface ProductItem {
  id: string | number;
  name: string;
  short_name?: string;
  price: string | number;
  images: string[];
  description: string;
  tier: number;
  nation: string;
  tank_type: string;
}
