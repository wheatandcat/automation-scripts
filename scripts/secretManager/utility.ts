import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

const client = new SecretManagerServiceClient();

type Setting = {
  maintenance: boolean;
};

export const updateSecret = async (setting: Setting) => {
  const [version] = await client.getSecretVersion({
    name: `projects/${process.env.SECRET_MANAGER_NAME}/versions/latest`,
  });

  console.info(`Found secret: ${version.name} with state ${version.state}`);

  const [data] = await client.accessSecretVersion({
    name: version.name,
  });

  const payload: Setting = JSON.parse((data.payload?.data ?? "").toString());

  payload.maintenance = setting.maintenance;

  await client.addSecretVersion({
    parent: `projects/${process.env.SECRET_MANAGER_NAME}`,
    payload: {
      data: Buffer.from(JSON.stringify(payload)),
    },
  });

  // 過去のバージョンは無効にする
  const values = version.name?.split("/") ?? [];
  const name = `projects/${process.env.SECRET_MANAGER_NAME}/versions/${
    values[values.length - 1]
  }`;
  if (values.length > 0) {
    await client.disableSecretVersion({
      name,
    });
  }

  console.info(`Disabled secret: ${name}`);
};
