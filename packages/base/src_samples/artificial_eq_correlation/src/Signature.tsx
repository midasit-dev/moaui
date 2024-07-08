/**
 * 
 * ███████╗██╗ ██████╗ ███╗   ██╗ █████╗ ████████╗██╗   ██╗██████╗ ███████╗
 * ██╔════╝██║██╔════╝ ████╗  ██║██╔══██╗╚══██╔══╝██║   ██║██╔══██╗██╔════╝
 * ███████╗██║██║  ███╗██╔██╗ ██║███████║   ██║   ██║   ██║██████╔╝█████╗  
 * ╚════██║██║██║   ██║██║╚██╗██║██╔══██║   ██║   ██║   ██║██╔══██╗██╔══╝  
 * ███████║██║╚██████╔╝██║ ╚████║██║  ██║   ██║   ╚██████╔╝██║  ██║███████╗
 * ╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚══════╝
 * 
 * @description sign of cra-template-moaui
 */

const currentVersionFromPackageJson = '1.1.95';

export const log = () => {
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
	const logo = `\x1b[32m███╗   ███╗ ██████╗  █████╗ ██╗   ██╗██╗       ██████╗██████╗  █████╗ \n████╗ ████║██╔═══██╗██╔══██╗██║   ██║██║      ██╔════╝██╔══██╗██╔══██╗\n██╔████╔██║██║   ██║███████║██║   ██║██║█████╗██║     ██████╔╝███████║\n██║╚██╔╝██║██║   ██║██╔══██║██║   ██║██║╚════╝██║     ██╔══██╗██╔══██║\n██║ ╚═╝ ██║╚██████╔╝██║  ██║╚██████╔╝██║      ╚██████╗██║  ██║██║  ██║\n╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝       ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝\x1b[0m`;
	const title = `cra-template with moaui v${currentVersionFromPackageJson}`;
	const deploy = `- deploy: https://www.npmjs.com/package/@midasit-dev/cra-template-moaui`
	const repository = `- repository: https://github.com/midasit-dev/create-template-moaui`;

	console.log(`\n\n\n${logo}\n\n${title}\n${deploy}\n${repository}\n\n\n`);
}

export const Component = () => {
	log();
	return null;
}

const Signature = {
	log,
	Component,
}

export default Signature;