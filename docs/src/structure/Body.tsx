import MenuHeader from "@/components/menu/Header";
import MenuItem from "@/components/menu/Item";
import ReferencePage from "@/components/menupages/ReferencePage";
interface BodyProp {

}
Body.defaultProps = {

}
function Body(props: BodyProp): React.ReactElement {
	return (
		<div className="flex justify-center">
			<div className="flex flex-wrap gap-4">

				{/** Left Menu */}
				<div className="flex flex-col gap-4 min-w-[100vw] xl:min-w-moa-menu">
					<div>
						<MenuHeader value={"Getting started"} />
						<MenuItem value={"Installation"} />
						<MenuItem value={"Editor Setup"} />
						<MenuItem value={"Playground"} />
					</div>
					<div className="mt-4">
						<MenuHeader value={"Concepts"} />
						<MenuItem value={"Block"} />
						<MenuItem value={"Colors"} />
					</div>
					<div className="mt-4">
						<MenuHeader value={"Components"} />
						<MenuItem value={"Button"} />
						<MenuItem value={"TextField"} />
						<MenuItem value={"Check"} />
						<MenuItem value={"Typography"} />
						<MenuItem value={"Input"} />
						<MenuItem value={"DropList"} />
						<MenuItem value={"Tab"} />
						<MenuItem value={"Radio"} />
						<MenuItem value={"Switch"} />
						<MenuItem value={"Table"} />
						<MenuItem value={"Icon"} />
					</div>
				</div>

				{/** Right Content */}
				<div className="flex min-w-[100vw] xl:min-w-moa-content xl:w-moa-content justify-center">
					{/* <Typography 
						type={TypographyType.body1}
						value={`
							MIDAS Information Technology Co., Ltd is a company that develops and distributes science and technology simulation software.
							Established in September 2000, it currently has about 700 global professional technical personnel, and has 8 local subsidiaries and branches in the US, China, Japan, UK, India, Russia, Dubai and the Philippines, as well as an overseas network in 28 countries around the world. has grown into a global small but strong company that exports software for engineering technology to more than 110 countries.

							Midas IT is a company that helps the happiness of the world through simulation of objects and people. We have the world's best technology for modeling objects based on computer graphics, advanced analysis and optimization design, which are core technologies in the engineering field, and object simulation.
							The MIDAS Family Program, developed and supplied by Midas IT, is applied to analysis and design for the stability and economic analysis of structures in all engineering and industrial fields. Since 2015, Midas IT has been developing and distributing human-centered management HRP solutions based on human research. Recruitment solutions based on neuroscience and artificial intelligence for the first time in the world lead the innovation of talent recruitment in Korean companies, and big data-based personnel solutions are leading the growth and development of companies through talent management through talent development.
							Since 2018, we have developed medical solutions that enable brain analysis, dementia diagnosis, and cardiovascular blood flow diagnosis through human simulation technology, and have entered the medical field to help prevent fatal diseases in the future.

							The source that makes Midas IT dynamically alive is all members of MIDAS IT, who always spare no effort for the best. Midas IT members are talented people who strive to fulfill their responsibilities for themselves, us, and the world, and are living a life as engineers who pursue happiness for people and the world. To increase the happiness of the world with Midas technology, Midas IT will continue to leap towards the world with ceaseless passion and challenge.
							`} /> */}
					<ReferencePage />
				</div>
			</div>
		</div>
	);
}

export default Body;