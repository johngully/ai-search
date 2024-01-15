import OpenAI from "openai";
import { getPrompt } from "./ai-prompt";
import { settingsRepository } from "@/data/settings-repository";

const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

export async function productSearchTextToCriteria(searchText: string) {
  const settings = await settingsRepository.get();
  const promptProps = toPromptProps(searchText, settings);
  const content = getPrompt(promptProps);
  // console.log("PROMPT");
  // console.log(content);
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

function toPromptProps(query: string, settings: Settings) {
  const contextTable = entitySettingsToContextTable(settings.product);
  const { conversion, must, mustNot } = settings.aiPrompt;
  const promptProps = { contextTable, conversion, must, mustNot, query }
  return promptProps;
}

function entitySettingsToContextTable(settingsObject: any) {
  let tableString = '';
  const settingsNames = Object.keys(settingsObject) as Array<any>;
  const settingsArray = Object.values(settingsObject) as Array<any>;
  
  if (settingsArray.length === 0) {
    return tableString;
  }

  // Reshape the settings array to contain the name of the entity as "response" property
  for (let i=0; i<settingsArray.length; i++) {
    settingsArray[i] = { response: settingsNames[i], ...settingsArray[i] } 
  }

  // Determine the column headers (keys from the first object)
  // Add the header to the settings
  const headers = Object.keys(settingsArray[0]);
  const flat = settingsArray.map(setting => Object.values(setting));
  flat.unshift(headers);

  // Format each row into a markdown style string
  flat.forEach((row: any) => {
    tableString += "| " + row.join(" | ") + " |\n";
  })

  return tableString;
}


