import { TextField } from "@midasit-dev/moaui-components-v1";/**${comma}*/

const ComponentsTextFieldLeft = ({
	wrappedWidth = '150px',/**${props-separator}*/
	width = '100px',/**${props-separator}*/
	placeholder = 'placeholder',/**${props-separator}*/
	title = 'title',/**${props-separator}*/
	titlePosition = 'left',/**${props-separator}*/
	disabled = false,/**${props-separator}*/
	defaultValue = '',/**${props-separator}*/
	error = false,/**${props-separator}*/
	spacing = 2,/**${props-separator}*/
}: any) => {
  return (
		<TextField 
			wrappedWidth={wrappedWidth}
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
