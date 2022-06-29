import { updateSecret } from "./utility";

const main = () => {
  const setting = {
    maintenance: true,
  };

  updateSecret(setting);
};

main();
