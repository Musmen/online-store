export interface ProductItem {
  id: string | number;
  name: string;
  short_name?: string;
  price: string | number;
  amount: string | number;
  images: string[];
  description: string;
  tier: number;
  nation: string;
  type: string;
}

export interface ProductData extends ProductItem {
  link?: string;
}
