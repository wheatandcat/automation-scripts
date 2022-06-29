import { updateSecret } from "./utility";

const main = () => {
  const setting = {
    maintenance: false,
  };

  updateSecret(setting);
};

main();
