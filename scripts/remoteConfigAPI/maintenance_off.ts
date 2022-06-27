import { validateTemplate, addNewCondition } from "./utility";

const main = async () => {
  const setting = {
    maintenance: false,
  };

  const template = await validateTemplate();
  addNewCondition(template, setting);
};

main();
