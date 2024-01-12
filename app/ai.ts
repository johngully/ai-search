import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

export async function productSearchTextToCriteria(searchText: string) {
  const content = `
  I want you to translate a natural language query into a structured format. 

  The query will be from a merchant asking about their products. Parse the Natural Language Query and put only the relevant information into the Response Structure.  Omit any information that may be in the query, but is not found in the Response Structure.

  HOW TO CONVERT
  --- 
  If an item is provided in quotes, do not change it.
  This is a list of the most popular product names: pant, short, shirt, jacket, blazer, sweater, glove
  Translate any synonyms provided in the Query to these names when it makes sense

  Convert any product names to singular form
  Convert any product sizes to their abbreviation: 
  - Extra Small = XS
  - Small = S
  - Medium = M
  - Large = L
  - Extra Large = XL

  When converting numeric values and asked for an approximate amount, use a 15% threshold
  When converting product margin and percent is indicated with % or "percent" divide the value by 100

  Convert any generalizations about margin using these thresholds. Pay attention to the < >= operators and use them to put the margin in the UpperBound and LowerBound properties
  - bad, low, poor, under performing: < .33
  - average, good, ok: > .33 and < .70
  - best, excellent, great, ideal, leading: > .70 
  ---
  
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

  RESPONSE STRUCTURE PROPERTY DESCRIPTIONS
  ---
  name is the name of the product
  dimensionA is the color of the item on the purchase order: (use only color descriptions)
  dimensionB is the size of the item on the purchase order: S, M, L, XL
  dimensionC is the fit of the item on the purchase order: Regular, Slim
  cost is the amount of money that was spent to acquire the product
  msrp is the amount of money that the product should sell for
  margin is the amount of money that will be made if the product is sold for msrp: margin = msrp - cost

  any property ending with LowerBound is the same as the property prefix but should be used as the lower bound of a range
  any property ending with UpperBound is the same as the property prefix but should be used as the upper bound of a range
  ---

  QUERY
  ---
  ${searchText}
  ---

  MUST DO
  ---
  - Respond with only the JSON structure provided below. Do not include any introduction or explanation before or after the JSON data
  ---

  MUST NOT DO
  ---
  - Must not respond with any text not in the Response Structure
  - Must not use a trailing "S" from a word as a value for dimensionA, dimensionB, dimensionC
  - Must not use values for dimensions that do not fit the property description
  - Most not return the numeric value if both the LowerBound and UpperBound are specified (do not return cost if costUpperBound and costLowerBound have values)
  ---
  `;
  const role = "user";
  const model = "gpt-3.5-turbo";
  // const model = "gpt-4";

  const params: OpenAI.Chat.ChatCompletionCreateParams = {
    messages: [{ role, content }],
    model,
  };
  
  const chatCompletion: OpenAI.Chat.ChatCompletion = await openai.chat.completions.create(params);
  // console.log(chatCompletion);
  const message = chatCompletion?.choices[0].message.content || "";
  const messageAsJson = JSON.parse(message);
  // console.log(messageAsJson);
  return messageAsJson;
}



