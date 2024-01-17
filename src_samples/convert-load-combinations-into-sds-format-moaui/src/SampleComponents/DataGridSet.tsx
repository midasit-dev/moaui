import { Panel, DataGrid, Color } from "@midasit-dev/moaui";

const Sample = () => {
	return (
		<div style={backgroundStyle}>
			<div style={outlineStyle}>
				<p style={pStyle}>Table Component</p>
				<Panel
					height="300px"
					width={`${outlineValue}px`}
					variant="shadow"
				>
					<DataGrid
						checkboxSelection
						columns={[ 
							{ editable: true,  field: 'id', 			 headerName: 'ID', 				 width: 70  },
							{ editable: true,  field: 'firstName', headerName: 'First name', width: 130 },
							{ editable: false, field: 'lastName',  headerName: 'Last name',  width: 130 }
						]}
						initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
						pageSizeOptions={[ 5 ]}
						rows={[ 
							{ age: 35, firstName: 'Jon', 		id: 1, lastName: 'Snow' 		 },
							{ age: 42, firstName: 'Cersei', id: 2, lastName: 'Lannister' },
							{ age: 45, firstName: 'Jaime', 	id: 3, lastName: 'Lannister' }
						]}
					/>
				</Panel>
				<p style={pStyle2}>To revert to the original state, perform "Ctrl + Z" in src/App.tsx.</p>
			</div>
		</div>
	)
}

export default Sample;

const backgroundStyle: any = {
	position: 'absolute',
	top: '0px',
	left: '0px',
	width: '100%',
	height: '100%',
	backgroundColor: Color.primary.enable,
}

const outlineValue = 500;
const outlineStyle: any = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	marginTop: -(outlineValue * 0.5),
	marginLeft: -(outlineValue * 0.5),
}

const pStyle: any = {
	fontSize: '30px',
	textAlign: 'center',
	color: Color.text.secondary
}

const pStyle2: any = {
	fontSize: '17px',
	textAlign: 'center',
	color: Color.text.third,
	paddingTop: '15px',
	marginBottom: '20px',
}