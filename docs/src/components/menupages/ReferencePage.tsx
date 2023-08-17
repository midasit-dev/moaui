import React from 'react';
import { useRecoilValue } from 'recoil';
import { selectedMenu } from '../../recoil/atom';
import Button from './Button';

export default function ReferencePage(props: any) {
	const selectedMenuItem:string = useRecoilValue<string>(selectedMenu);

	function ReferenceCompo(props:any){
		console.log(props.Compo)
		return (
			<>
				{props.Compo === "Button" ? <Button/> : <></>}
			</>
		)
	}

	return (
		<>
			<ReferenceCompo Compo={selectedMenuItem}/>
		</>
	);
}