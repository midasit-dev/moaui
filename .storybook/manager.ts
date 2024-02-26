// .storybook/manager.js

import { addons } from '@storybook/manager-api';
import themeMoaui from "./moaui-theme";

addons.setConfig({
  theme: themeMoaui,
});
