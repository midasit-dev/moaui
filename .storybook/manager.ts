// .storybook/manager.js

import { addons } from '@storybook/manager-api';
import themeMoaui from "./theme-moaui";

addons.setConfig({
  theme: themeMoaui
});