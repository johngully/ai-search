import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

export async function productSearchTextToCriteria(searchText: string) {
  const content = `
  I want you to translate a natural language query into a structured format. 

  The query will be from a merchant asking about their products. Parse the Natural Language Query and put only the relevant information into the Response Structure.  Omit any information that may be in the query, but is not found in the Response Structure.

  Convert any product names to singular form
  Convert any product sizes to their abbreviation: 
  - Extra Small = XS
  - Small = S
  - Medium = M
  - Large = L
  - Extra Large = XL
  
  Respond with only the JSON structure provided below. Do not include any introduction or explanation before or after the JSON data
  
  Response Structure
  ---
  {
    name: string,
    dimensionA: string,
    dimensionB: string,
    dimensionC: string,
    cost: number,
    msrp: number,
    margin: number
  }
  ---

  Response Structure property descriptions
  ---
  name is the name of the product
  dimensionA is the color of the item on the purchase order
  dimensionB is the size of the item on the purchase order
  dimensionC is the fit of the item on the purchase order
  cost is the amount of money that was spent to acquire the product
  msrp is the amount of money that the product should be sold for
  margin is the amount of money that will be made if the product is sold for msrp: margin = msrp - cost
  ---

  Query
  ---
  ${searchText}
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
  console.log(messageAsJson);
  return messageAsJson;
}



