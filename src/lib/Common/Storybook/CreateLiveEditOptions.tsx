import * as Moaui from '../..';

const createLiveEditOptions = (_code_: string) => {
	return {
		availableImports: { "@midasit-dev/moaui": Moaui },
		code: _code_,
		modifyEditor(monaco: any, editor: any) {
			monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
				noSemanticValidation: false,
			});
			monaco.editor.setTheme('vs-dark');
			editor.focus();
		},
	}
}

export default createLiveEditOptions;