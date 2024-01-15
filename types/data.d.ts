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

type Settings = {
  product: {
    dimensionA: EntitySetting
    dimensionB: EntitySetting
    dimensionC: EntitySetting
    cost: EntitySetting
    msrp: EntitySetting
    margin: EntitySetting
  },
  aiPrompt: {
    conversion?: string,
    must: string,
    mustNot: string
  }
}

type EntitySetting = {
  name: string,
  description?: string,
  synonyms?: string,
  searchType: "exact" | "includes" | "range"
}

type AISettings = {
  conversion?: string,
  must?: string,
  mustNot?: string
}
