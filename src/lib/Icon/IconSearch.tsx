import React, { Fragment } from 'react';
import { TextField } from '../';
import { Button } from '../';
import { IconNameTypes } from './iconDict';

function Item(props: any) {
	const [isCopied, setIsCopied] = React.useState(false);

	return (
		<div key={props.key}>
			{props.item}
			<Button
				onClick={async () => { 
					await navigator.clipboard.writeText(props.item);
					setIsCopied(true);
				}}
				variant="text"
				disabled={isCopied}
			>
				{isCopied ? "Copied!" : "Copy"}
			</Button>
		</div>
	)
}

function Search(props: any) {
	const [textFieldValue, setTextFieldValue] = React.useState("");
	const [results, setResults] = React.useState(new Array<string>());

	const onChangeHandler = (event: any) => {
		setTextFieldValue(event.target.value);
	}

	const onClickHandler = () => {
		if (textFieldValue === "") {
			setResults([]);
			return;
		}

		const filtered = IconNameTypes.filter((item: string) => {
			return item.includes(textFieldValue);
		});

		setResults(filtered);
	}

	return (
		<Fragment>
			<TextField 
				value={textFieldValue}
				onChange={onChangeHandler} 
				placeholder="searching ..."
				title="Find Icon Name" 
				titlePosition="left"
				width="auto"
			/>
			<Button
				onClick={onClickHandler}
				variant="text"
			>
				Search
			</Button>
			{results.length !== 0 &&
				<Button
					onClick={() => {
						setTextFieldValue("");
						setResults([]);
					}}
					variant="text"
				>
					Clear
				</Button>
			}
			<div>
				{results.length === 0 &&
					<div style={{
						color: "#888",
						fontSize: "0.8rem",
						marginTop: "0.5rem",
					}}>Typing Icon Name ... (Please be mindful of uppercase and lowercase letters.)</div>
				}
				{results.map((item: any, index: any) => {
					return <Item key={index} item={item} />
				})}
			</div>
		</Fragment>
	)
}

export default Search;

