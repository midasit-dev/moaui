import { CodeBlock } from "@midasit-dev/moaui-components-v1";/**${comma}*/

const ComponentsCodeBlockTypescript = () => {
	const code = `interface TextType {
	name: string;
	age: number;
	city: string;
}
const txt: TextType = {
	"name":"John", 
	"age":30, 
	"city":"New York"
};
const obj = JSON.parse(txt.toString());
document.getElementById("demo").innerHTML = obj.name + ", " + obj.age;`;
	return (
		<CodeBlock 
			language="typescript"
			title="javascript Code Block"
		>
			{code}
		</CodeBlock>
	);
}/**${comma}*/

export default ComponentsCodeBlockTypescript;