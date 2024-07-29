import { GuideBox, Typography, ExperimentalLanguageDropList as LanguageDropList } from "@midasit-dev/moaui-components-v1";

//delete storybook in real using.
const App = () => {
  return (
    <GuideBox row spacing={2} verCenter>
      <Typography>Language</Typography>
		  <LanguageDropList 
				storybook
				languages={[
					{ name: 'Korean', path: 'ko' },
					{ name: 'English', path: 'en' },
					{ name: 'Japanese', path: 'ja' },
				]}
			/>
    </GuideBox>
  );
}

export default App;