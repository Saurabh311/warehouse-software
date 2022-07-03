export interface Product {
  name: string;
  containArticles: { art_id: string; amount_of: string }[];
}
