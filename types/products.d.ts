// Entities
type Products = Array<Product>;

type Product = {
  name: string,
  dimensionA: string,
  dimensionB: string,
  dimensionC: string,
  cost: number,
  msrp: number,
  margin: number,
};

// Shared Types
type Criteria = {
  name?: string,
  dimensionA?: string,
  dimensionB?: string,
  dimensionC?: string,
  cost?: number,
  costLowerBound?: number,
  costUpperBound?: number,
  msrp?: number,
  msrpLowerBound?: number,
  msrpUpperBound?: number,
  margin?: number,
  marginLowerBound?: number,
  marginUpperBound?: number,
};
