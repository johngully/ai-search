"use server";
import { settingsRepository } from "@/data/settings-repository";

export async function saveSettings(formData: FormData) {
  const aiPrompt = {
    ...formDataToSetting("conversion", formData),
    ...formDataToSetting("must", formData),
    ...formDataToSetting("mustNot", formData),
  };
  
  const product = {
    ...formDataToEntitySetting("dimensionA", formData),
    ...formDataToEntitySetting("dimensionB", formData),
    ...formDataToEntitySetting("dimensionC", formData),
    ...formDataToEntitySetting("cost", formData),
    ...formDataToEntitySetting("msrp", formData),
    ...formDataToEntitySetting("margin", formData),
  };
  const settings = { aiPrompt, product } as Settings;
  await settingsRepository.save(settings);

}

function formDataToSetting(key: string, formData: FormData) {
  return { [key]: formData.get(key) };
}

function formDataToEntitySetting(key: string, formData: FormData) {
  const entitySetting = {
    name: formData.get(`${key}.name`),
    description: formData.get(`${key}.description`),
    synonyms: formData.get(`${key}.synonyms`),
  } as EntitySetting;

  return { [key]: entitySetting };
}