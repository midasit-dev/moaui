import { CodeBlock, GuideBox } from "@midasit-dev/moaui";/**${comma}*/

const ComponentsCodeBlockHideTitle = () => {
	const code = `const txt = {
	"name":"John", 
	"age":30, 
	"city":"New York"
};
const obj = JSON.parse(txt.toString());
document.getElementById("demo").innerHTML = obj.name + ", " + obj.age;`;
	return (
		<GuideBox width={600}>
			<CodeBlock 
				language="javascript"
				title="javascript Code Block"
				hideTitle
				radius={0}
			>
				{code}
			</CodeBlock>
		</GuideBox>
	);
}/**${comma}*/

export default ComponentsCodeBlockHideTitle;
