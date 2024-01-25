const currentVersionFromPackageJson = '0.1.90';

const log = () => {
	/**
	 * logo Color Code
	 * 31: Red
	 * 32: Green
	 * 33: Yellow
	 * 34: Blue
	 * 35: Magenta
	 * 36: Cyan
	 * 37: White
	 */
	const logo = `\x1b[36m███╗   ███╗ ██████╗  █████╗ ██╗   ██╗██╗\n████╗ ████║██╔═══██╗██╔══██╗██║   ██║██║\n██╔████╔██║██║   ██║███████║██║   ██║██║\n██║╚██╔╝██║██║   ██║██╔══██║██║   ██║██║\n██║ ╚═╝ ██║╚██████╔╝██║  ██║╚██████╔╝██║\n╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝\x1b[0m`;
	const title = `moaui (React UI Library) v${currentVersionFromPackageJson}`;
	const deploy = `- deploy: https://www.npmjs.com/package/@midasit-dev/moaui`
	const repository = `- repository: https://github.com/midasit-dev/moaui`;
	const doumentation = `- documentation: https://midasit-dev.github.io/moaui`;

	console.log(`\n\n\n${logo}\n\n${title}\n${deploy}\n${repository}\n${doumentation}\n\n\n`);
}

const Component = () => {
	log();
	return null;
}

const Signature = {
	log,
	Component,
}

export default Signature;