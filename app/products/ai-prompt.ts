type promptProps = {
  contextTable?: string, 
  conversion?: string, 
  must?: string, 
  mustNot?: string, 
  query?: string
}
export function getPrompt({ contextTable, conversion, must, mustNot, query }: promptProps) {
  const prompt = `
I want you to translate a natural language query into a structured format. The query will be from a merchant asking about their products. Parse the Natural Language Query and put only the relevant information into the Response Structure. Omit any information that may be in the query, but is not found in the Response Structure.

RESPONSE STRUCTURE
---
{
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
}
---

RESPONSE STRUCTURE ADDITIONAL CONTEXT TABLE
---
Use the information in this table to better understand the context of the query.

${contextTable}
---

HOW TO CONVERT THE QUERY TO THE RESPONSE STRUCTURE
--- 
Text within qutoes should be treated as a single phrase and should not be broken apart
Convert names to singular form
When parsing the query keep phrases that are in quotes together. Do not break apart a phrase into separate words when it is encapsulated in single quotes or double quotes
When converting to singular form do not use the trailing characters ("s", "es", "ies") for any other purposes
When converting Margin and percent is indicated with % or "percent" divide the value by 100
Any property ending with LowerBound is the same as the property prefix but should be used as the lower bound of a range
Any property ending with UpperBound is the same as the property prefix but should be used as the upper bound of a range
${conversion}  
---

MUST DO
---
- Respond with only the JSON structure provided below. Do not include any introduction or explanation before or after the JSON data
${must}
---

MUST NOT DO
---
- Must not respond with any text not in the Response Structure
- Must not use values for dimensions that do not fit the property description
- Most not return the numeric value if both the LowerBound and UpperBound are specified (do not return cost if costUpperBound and costLowerBound have values)
${mustNot}
---

QUERY
---
${query}
---
`;

  return prompt;
}

