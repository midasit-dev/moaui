import { createLiveEditStory } from 'storybook-addon-code-editor';
import * as Moaui from '../..';

const LiveEditStory: any = (_code_: string) => createLiveEditStory({
	availableImports: { "@midasit-dev/moaui": Moaui },
	code: _code_,
	modifyEditor(monaco: any, editor: any) {
		monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
			noSemanticValidation: false,
		});
		monaco.editor.setTheme('vs-dark');
		editor.focus();
	},
});

export default LiveEditStory;