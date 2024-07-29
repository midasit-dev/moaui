import { GuideBox, Panel } from "@midasit-dev/moaui-components-v1";/**${comma}*/

const ComponentsGuideBoxLayout1 = () => {
	const visible = true;
	return (
		<GuideBox show={visible} padding={1}>
			{/** Top Panels */}
			<GuideBox show={visible} width={1050} padding={1} row spacing={2} center>

				<Panel variant='shadow' height={486}>
					<GuideBox show={visible} width={300} fill='2'>
						<GuideBox show={visible} width='100%' height={60} fill='3' center>
						</GuideBox>
						<GuideBox show={visible} width='100%' fill='3' spacing={1}>
							<GuideBox show={visible} width='100%' height={30} spacing={1} row>
							</GuideBox>
							<GuideBox show={visible} width='100%' height={30} spacing={1} row>
							</GuideBox>
							<GuideBox show={visible} width='100%' height={30} spacing={1} row>
							</GuideBox>
							<GuideBox show={visible} width='100%' height={30} spacing={1} row>
							</GuideBox>
							<GuideBox show={visible} width='100%' height={30} spacing={1} row>
							</GuideBox>
						</GuideBox>
						<GuideBox show={visible} width='100%' height={244} fill='3'>
						</GuideBox>
					</GuideBox>
				</Panel>
				<Panel variant='shadow' height={486}>
					<GuideBox show={visible} width={400} fill='2' spacing={2}>
							<GuideBox show={visible} width='100%' height={60} fill='3' center>
							</GuideBox>
							<GuideBox show={visible} width='100%' height={410} fill='3' center>
							</GuideBox>
					</GuideBox>
				</Panel>
				<Panel variant='shadow' height={486}>
					<GuideBox show={visible} width={250} fill='2' spacing={2}>
						<GuideBox show={visible} width='100%' height={60} fill='3' center>
						</GuideBox>
						<GuideBox show={visible} width='100%' height={410} fill='3' center>
						</GuideBox>
					</GuideBox>
				</Panel>

			</GuideBox>

			{/** Bottom Buttons */}
			<GuideBox show={visible} width={1050} row padding={1} fill='2' center>
				<GuideBox show={visible} width="30%" height={30} fill='3' row spacing={2} verCenter>
				</GuideBox>
				<GuideBox show={visible} width="69%" height={30} fill='4' row spacing={0} horSpaceBetween verCenter>
				</GuideBox>
			</GuideBox>
		</GuideBox>
	);
};/**${comma}*/

export default ComponentsGuideBoxLayout1;