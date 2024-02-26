import { CodeBlock, GuideBox } from "@midasit-dev/moaui";/**${comma}*/

const ComponentsCodeBlockJavascript = () => {
	const jsCode = `const txt = {
	"name":"John", 
	"age":30, 
	"city":"New York"
};
const obj = JSON.parse(txt.toString());
document.getElementById("demo").innerHTML = obj.name + ", " + obj.age;`;

//convert to typescript
const tsCode = `const txt: string = JSON.stringify({
	"name":"John",
	"age":30,
	"city":"New York"
});
const obj = JSON.parse(txt);
document.getElementById("demo").innerHTML = obj.name + ", " + obj.age;`;

const jsonCode = `{
	"name":"John",
	"age":30,
	"city":"New York"
}`;

const markdownCode = `$ npm run dev`;

	return (
		<GuideBox spacing={1}>
			<CodeBlock language="js" title="js" children={jsCode} />
			<CodeBlock language="ts" title="ts" children={tsCode} />
			<CodeBlock language="json" title="json" children={jsonCode} />
			<CodeBlock language="markdown" title="markdown" children={markdownCode} />
		</GuideBox>
	);
}/**${comma}*/

export default ComponentsCodeBlockJavascript;


