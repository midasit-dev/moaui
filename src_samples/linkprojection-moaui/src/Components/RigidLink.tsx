/**
 * 
 * ██████╗        █████╗ ██████╗ ██████╗ 
 * ╚════██╗      ██╔══██╗██╔══██╗██╔══██╗
 *  █████╔╝█████╗███████║██████╔╝██████╔╝
 *  ╚═══██╗╚════╝██╔══██║██╔═══╝ ██╔═══╝ 
 * ██████╔╝      ██║  ██║██║     ██║     
 * ╚═════╝       ╚═╝  ╚═╝╚═╝     ╚═╝     
 * 
 * @description Entry point for the application after Wrapper
 * @next last entry point
 */

import {useRecoilState,} from 'recoil';

import { 
	GuideBox, 
	Panel,
	Typography,
	Check, Button
} from '@midasit-dev/moaui';
import LinkFig from './LinkFIG.png'
import RigidBodyFig from './RigidBodyFIG.png'

import {RigidDX, RigidDY, RigidDZ, RigidRX, RigidRY, RigidRZ,} from './variables';

const RigidLink = () => {

	const [rigidDx, setRigidDx] = useRecoilState(RigidDX);
	const [rigidDy, setRigidDy] = useRecoilState(RigidDY);
	const [rigidDz, setRigidDz] = useRecoilState(RigidDZ);
	const [rigidRx, setRigidRx] = useRecoilState(RigidRX);
	const [rigidRy, setRigidRy] = useRecoilState(RigidRY);
	const [rigidRz, setRigidRz] = useRecoilState(RigidRZ);

	
	const RigidBodyOnClick = () => {
		setRigidDx(true);
		setRigidDy(true);
		setRigidDz(true);
		setRigidRx(true);
		setRigidRy(true);
		setRigidRz(true);
	}
	const PlaneXYOnClick = () => {
		setRigidDx(true);
		setRigidDy(true);
		setRigidRz(true);

		setRigidDz(false);
		setRigidRx(false);
		setRigidRy(false);
	}

	const PlaneYZOnClick = () => {
		setRigidDy(true);
		setRigidDz(true);
		setRigidRx(true);

		setRigidDx(false);
		setRigidRy(false);
		setRigidRz(false);
	}

	const PlaneXZOnClick = () => {
		setRigidDx(true);
		setRigidDz(true);
		setRigidRy(true);

		setRigidDy(false);
		setRigidRx(false);
		setRigidRz(false);
	}

	return (
		<GuideBox>
			<GuideBox row spacing={1} paddingBottom={1}>
				<img src={LinkFig} alt='LinkFig' width='100%'/>
				<img src={RigidBodyFig} alt='RigidBodyFig' width='100%'/>
			</GuideBox>
		
			<GuideBox row width='auto' spacing={1}>
				<Panel>
					<Typography variant='h1'>DOF of Rigid Link</Typography>
					<GuideBox width = {200} paddingTop={2} verCenter spacing={1} > 
						<GuideBox row verCenter spacing={1} horSpaceBetween>
							<GuideBox width = {60} row verCenter>
								<Check checked = {rigidDx} onChange={(e:any) => setRigidDx(e.target.checked)}/>	
								<Typography >DX</Typography>
							</GuideBox>
							<GuideBox width = {60}row verCenter>
								<Check checked = {rigidDy} onChange={(e:any) => setRigidDy(e.target.checked)}/>	
								<Typography >DY</Typography>
							</GuideBox>
							<GuideBox width = {60}row verCenter>
								<Check checked = {rigidDz} onChange={(e:any) => setRigidDz(e.target.checked)}/>	
								<Typography >DZ</Typography>
							</GuideBox>
						</GuideBox>

						<GuideBox row verCenter spacing={1} horSpaceBetween>
							<GuideBox width = {60} row verCenter>
								<Check checked = {rigidRx} onChange={(e:any) => setRigidRx(e.target.checked)}/>	
								<Typography >RX</Typography>
							</GuideBox>
							<GuideBox width = {60} row verCenter>
								<Check checked = {rigidRy} onChange={(e:any) => setRigidRy(e.target.checked)}/>	
								<Typography >RY</Typography>
							</GuideBox>
							<GuideBox width = {60} row verCenter>
								<Check checked = {rigidRz} onChange={(e:any) => setRigidRz(e.target.checked)}/>	
								<Typography >RZ</Typography>
							</GuideBox>
						</GuideBox>
					</GuideBox>
				</Panel>

				<Panel>
					<Typography variant='h1'>Typical Type</Typography>
					<GuideBox verCenter paddingTop={1} spacing={1} width={210}>
						<GuideBox horSpaceBetween row spacing={1} width = {200}>
							<Button variant = 'outlined' width='100px' onClick={RigidBodyOnClick}>Rigid Body</Button>
							<Button variant = 'outlined' width='100px' onClick={PlaneXYOnClick}>Plane X-Y</Button>
						</GuideBox>
						<GuideBox horSpaceBetween row spacing={1}>
							<Button variant = 'outlined' width='100px' onClick={PlaneYZOnClick}>Plane Y-Z</Button>
							<Button variant = 'outlined' width='100px' onClick={PlaneXZOnClick}>Plane X-Z</Button>
						</GuideBox>
						
					</GuideBox>
				</Panel>
			</GuideBox>
		</GuideBox>
	);
}

export default RigidLink;