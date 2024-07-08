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
	body?: any;
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
			...(method === 'post' || method === 'put' ? {
				body: JSON.stringify(body),
			} : {}), // if method is post or put, then add body to the request
		});

		if (response.ok) {
			return await response.json();
		} else {
			console.error('request failed!');
		}
	} catch (error) {
		console.error('An error occurred:', error);
	}
}

export default onClickHandler;