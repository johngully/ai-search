import { Card } from "@/components/pages";
import { settingsRepository } from "@/data/settings-repository";
import { saveSettings } from "./actions";

export default async function SettingsPage() {
  const settings = await settingsRepository.get()

  return (
    <form action={saveSettings} className="flex flex-col justify-items-start">
      <Card title="Product Settings">
        <EntitySettingsInputs settings={settings.product}></EntitySettingsInputs>
      </Card>
      <Card title="AI Prompt Settings" className="mb-8">
        <AISettingsInputs settings={settings.aiPrompt}></AISettingsInputs>
      </Card>
      <div className="flex justify-end">
        <button type="submit" className={`flex items-center justify-center rounded-lg p-2 px-6 font-light text-white border-gray-200 bg-[#33CC99] bg-opacity-80 hover:bg-opacity-100 shadow-md hover:shadow-lg hover:contrast-more`}>Save Settings</button>
      </div>
    </form>
  );
}

type AISettingsProps = { settings: AISettings };
function AISettingsInputs({ settings }: AISettingsProps) {
  const settingGroupStyles = "flex flex-col gap-4"
  const settingRowStyles="w-full"
  const labelStyles="text-sm uppercase font-bold";
  const inputStyles="p-2 border rounded-lg w-full outline-none focus:border-[#33CC99] focus:shadow-lg";

  const conversionDescription = `Describe specific details about how the search should be translated to values in the date. If you have data that uses abbreviations you should provide mappings between common search terms and the abbreviations:
  - Extra Small = XS
  - Small = S
  - Medium = M
  - Large = L
  - Extra Large = XL
  `;
  const mustDescription = "Provide additional instructions that describe what should be done. This is helpful for providing guidance for specific scenarios.";
  const mustNotDescription = "Provide additional instruction that describe what not be done. This is helpful for eliminating behavior that is incorrect.";

  return (
    <div className={settingGroupStyles}>
      <div className={settingRowStyles}>
        <span className={labelStyles}>Conversion: </span>
        <textarea className={inputStyles} name="conversion" rows={7} defaultValue={settings.conversion} placeholder={conversionDescription} title={conversionDescription}></textarea>
      </div>
      <div className={settingRowStyles}>
        <span className={labelStyles}>Must: </span>
        <textarea className={inputStyles} name="must" rows={5} defaultValue={settings.must} placeholder={mustDescription} title={mustDescription}></textarea>
      </div>
      <div className={settingRowStyles}>
        <span className={labelStyles}>Must not: </span>
        <textarea className={inputStyles} name="mustNot" rows={5} defaultValue={settings.mustNot} placeholder={mustNotDescription} title={mustNotDescription}></textarea>
      </div>
    </div>
  );
}

type SettingsProp = { settings: Record<string, EntitySetting> }
function EntitySettingsInputs({ settings }: SettingsProp) {
  const settingsKeys = Object.keys(settings);
  return (
    <div>
      {settingsKeys.map(key => (
        <EntitySettingInputs key={key} objectKey={key} setting={settings[key]} />
      ))}
    </div>
  );
}

type SettingProp = { objectKey: string, setting: EntitySetting }
function EntitySettingInputs({ objectKey, setting }: SettingProp) {
  const settingGroupStyles = "mb-4"
  const settingNameStyles="text-sm uppercase font-bold";
  const settingsRow="flex gap-4"
  const settingStyles="flex-1 py-1";
  const labelStyles="block w-full text-sm";
  const inputStyles="p-2 border rounded-lg w-full outline-none focus:border-[#33CC99] focus:shadow-lg";
  return (
    <div className={settingGroupStyles}>
      <div className={settingNameStyles}>{objectKey}</div>
      <div className={settingsRow}>
      <div className={settingStyles}><span className={labelStyles}>Name: </span><input className={inputStyles} name={`${objectKey}.name`} type="text" defaultValue={setting.name}></input></div>
      <div className={settingStyles}><span className={labelStyles}>Description: </span><textarea className={inputStyles} name={`${objectKey}.description`} defaultValue={setting.description}></textarea></div>
      <div className={settingStyles}><span className={labelStyles}>Synonyms: </span><textarea className={inputStyles} name={`${objectKey}.synonyms`} defaultValue={setting.synonyms}></textarea></div>
      </div>
    </div>
  );
}