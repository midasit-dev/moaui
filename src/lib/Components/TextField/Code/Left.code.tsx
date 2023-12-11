import { TextField } from "@midasit-dev/moaui";/**${comma}*/

const ComponentsTextFieldLeft = ({
	width = '100px',/**${props-seperator}*/
	placeholder = 'placeholder',/**${props-seperator}*/
	title = 'title',/**${props-seperator}*/
	titlePosition = 'left',/**${props-seperator}*/
	disabled = false,/**${props-seperator}*/
	defaultValue = '',/**${props-seperator}*/
	error = false,/**${props-seperator}*/
	spacing = 2,/**${props-seperator}*/
}: any) => {
  return (
		<TextField 
			width={width}
			placeholder={placeholder}
			title={title}
			titlePosition={titlePosition}
			disabled={disabled}
			defaultValue={defaultValue}
			error={error}
			spacing={spacing}
		/>
  );
};/**${comma}*/

export default ComponentsTextFieldLeft;
