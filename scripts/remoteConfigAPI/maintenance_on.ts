import { validateTemplate, addNewCondition } from "./utility";

const main = async () => {
  const setting = {
    maintenance: true,
  };

  const template = await validateTemplate();
  addNewCondition(template, setting);
};

main();
