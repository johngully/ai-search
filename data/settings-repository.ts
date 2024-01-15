import { readFile, writeFile } from "fs/promises";

const SETTINGS_FILE_PATH = `${process.cwd()}/data/data-settings.json`;

export const settingsRepository = { get, save };

async function get(): Promise<Settings> {
  const file = await readFile(SETTINGS_FILE_PATH);
  const settings = JSON.parse(file.toString());
  return settings;
}

async function save(settings: Settings) {
  console.log("Save Settings to file", settings);
  const oldSettings = await get();
  const newSettings = { 
    aiPrompt: { ...oldSettings?.aiPrompt, ...settings?.aiPrompt}, 
    product: { ...oldSettings?.product, ...settings?.product }
  };
  const settingsString = JSON.stringify(newSettings);
  await writeFile(SETTINGS_FILE_PATH, settingsString);
  console.log("Saved Settings to file", newSettings);
  return true;
}

