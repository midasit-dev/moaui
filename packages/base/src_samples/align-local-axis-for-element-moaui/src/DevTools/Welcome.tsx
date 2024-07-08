import {
  Panel,
  Typography,
  GuideBox,
  CodeBlock,
  Color,
  DropList,
} from "@midasit-dev/moaui";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const StandardLanguage = ["en", "ko", "ja"];

const languageList = new Map([
  ["English", StandardLanguage[0]],
  ["Korean", StandardLanguage[1]],
  ["Japanese", StandardLanguage[2]],
]);

const initLanguage = () => {
  const urlPath = window.location.pathname.split("/")[1];
  if (StandardLanguage.indexOf(urlPath) !== -1) {
    return urlPath; // url path is included in StandardLanguage
  } else {
    return StandardLanguage[0]; // url path is not included in StandardLanguage. so, set default language 'en'
  }
};

const Welcome = () => {
  const navigate = useNavigate();
  const { t: translate, i18n: internationalization } = useTranslation();
  const [language, setLanguage] = React.useState(initLanguage);

  React.useEffect(() => {
		const querys = window.location.search;
    navigate(`/${language}${querys}`); // change url path to selected language
		// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  function onChangeLangHandler(event: any) {
    setLanguage(event.target.value); // event.target.value is language code (en, ko, ja)
    internationalization.changeLanguage(event.target.value); // change language
  }

  return (
    <Panel
      width="100%"
      variant="shadow2"
      padding={2}
      border={`1px solid ${Color.secondary.main}`}
    >
      <GuideBox spacing={2}>
        <GuideBox row width="100%" horSpaceBetween verCenter>
					<GuideBox pulse spacing={1}>
						💚💚💚
					</GuideBox>
					<GuideBox row verCenter spacing={2}>
						<Typography>Select a Language</Typography>
						<DropList
							width="auto"
							itemList={languageList}
							value={language}
							onChange={onChangeLangHandler}
						/>
					</GuideBox>
				</GuideBox>
        <GuideBox row width="100%" horSpaceBetween verCenter>
          <Typography variant="h1">
            {translate("welcome_midas_plugin")}
          </Typography>
        </GuideBox>
        <GuideBox spacing={0.7}>
          <Typography>{translate("dev_mode_developing")}</Typography>
          <Typography>{translate("turn_on_development_mode")}</Typography>
          <Typography>{translate("type_command_below")}</Typography>
        </GuideBox>
        <CodeBlock language="markdown" title="in terminal" radius={0}>
          {`npm run dev`}
        </CodeBlock>
      </GuideBox>
    </Panel>
  );
};

export default Welcome;
