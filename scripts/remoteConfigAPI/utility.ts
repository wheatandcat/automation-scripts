import admin from "firebase-admin";
import { RemoteConfigTemplate } from "firebase-admin/remote-config";

admin.initializeApp();

export const validateTemplate = async () => {
  const template = await admin.remoteConfig().getTemplate();

  return template;
};

export const addNewCondition = async (
  template: RemoteConfigTemplate,
  setting: any
) => {
  const appConfig = template.parameters["appConfig"];
  const defaultValue = (appConfig.defaultValue as any).value as any;

  template.parameters["appConfig"] = {
    defaultValue: {
      value: JSON.stringify({
        ...JSON.parse(defaultValue),
        ...setting,
      }),
    },
    valueType: appConfig.valueType,
    description: appConfig.description,
  };

  try {
    await admin.remoteConfig().validateTemplate(template);
  } catch (e) {
    console.error(e);
  }

  try {
    await admin.remoteConfig().publishTemplate(template);
  } catch (e) {
    console.error(e);
  }
};
