import { products } from './data';

export const productsRepository = {
  findMany
}

async function findMany(criteria: Criteria): Promise<Products> {
  const results = products.filter((product: Product) => {
    const filters: Array<boolean> = [];
    addCriteriaToFilter(filters, filterProperty(product, criteria, "name"));
    addCriteriaToFilter(filters, filterProperty(product, criteria, "dimensionA"));
    addCriteriaToFilter(filters, filterProperty(product, criteria, "dimensionB", "exact"));
    addCriteriaToFilter(filters, filterProperty(product, criteria, "dimensionC", "exact"));
    addCriteriaToFilter(filters, filterProperty(product, criteria, "cost", "exact"));
    addCriteriaToFilter(filters, filterProperty(product, criteria, "costLowerBound", "gteq"));
    addCriteriaToFilter(filters, filterProperty(product, criteria, "costUpperBound", "lteq"));
    addCriteriaToFilter(filters, filterProperty(product, criteria, "msrp", "exact"));
    addCriteriaToFilter(filters, filterProperty(product, criteria, "msrpLowerBound", "gteq"));
    addCriteriaToFilter(filters, filterProperty(product, criteria, "msrpUpperBound", "lteq"));
    addCriteriaToFilter(filters, filterProperty(product, criteria, "margin", "exact"));
    addCriteriaToFilter(filters, filterProperty(product, criteria, "marginLowerBound", "gteq"));
    addCriteriaToFilter(filters, filterProperty(product, criteria, "marginUpperBound", "lteq"));
    return filters.every(f => f === true)
  });
  return results;
}

function addCriteriaToFilter(filters: Array<boolean>, filterResult) {
  if (filterResult.hasCriteria) {
    filters.push(filterResult.isMatch);
  }
}

function filterProperty(product:any, criteria:any, property:string, matchType:string="includes") {
  
  let isMatch = false;
  const name = property.replace("LowerBound", "").replace("UpperBound", "")
  const pValue = isNaN(product[name]) ? product[name]?.trim()?.toLowerCase() : product[name];
  const cValue = isNaN(criteria[property]) ? criteria[property]?.trim()?.toLowerCase() : criteria[property];

  let hasCriteria = cValue !== undefined && cValue !== null && cValue !== "";
  if (!hasCriteria) {
    return { name, criteriaExists: false, isMatch: false };
  }

  switch (matchType) {
    case "exact":
      isMatch = pValue===cValue;
      break;
    case "lteq": 
      isMatch = pValue<=cValue;
      break;
    case "gteq": 
      isMatch = pValue>=cValue;
      break;
    case "includes":
    default:
      isMatch = pValue.includes(cValue);
      break;
  }

  return { name, hasCriteria, isMatch };
}