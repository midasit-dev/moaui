import { Color } from '@midasit-dev/moaui';

const pStyle3: any = {
	fontSize: '20px',
	textAlign: 'center',
	color: Color.secondary.main,
	textDecoration: 'underline',
}

const LearnMoreComponent = () => {
	return (
		<a href="https://dev--6556d17f924e868b000ddaf5.chromatic.com/" target="_blank" rel="noopener noreferrer"><p style={pStyle3}>Learn moaui</p></a>
	)
}

export default LearnMoreComponent;