import Constant from '../../constant.json';

interface OnClickHandlerProps {
	/**
	 * url path
	 * 
	 * @example
	 * `${Constant.baseUrl}/src/wrapper-tsx`
	 */
	path: string; 
	/**
	 * commonly used in object
	 * 
	 * @example
	 * {
	 * 	color: color
	 * }
	 */
	body: any;
	/**
	 * fetching method
	 */
	method: 'put' | 'post' | 'delete' | 'get';
}

const onClickHandler = async (props: OnClickHandlerProps) => {
	const { path, body, method } = props;

	try {
		const response = await fetch(`${Constant.baseUrl}${path}`, {
			method: method,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});

		if (response.ok) {
			console.log('Change Manifest.json successfully');
		} else {
			console.error('Update failed');
		}
	} catch (error) {
		console.error('An error occurred:', error);
	}
}

export default onClickHandler;