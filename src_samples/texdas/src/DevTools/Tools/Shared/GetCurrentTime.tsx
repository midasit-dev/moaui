export interface Time {
	year: number;
	month: number;
	day: number;
	hour: number;
	minute: number;
	second: number;
	fullString: string;
	fullStringWithDash: string;
	fullWithExtension: (postfix: string) => string;
	sample: (extension: string) => string;
}

const getCurrentTime = (): Time => {
	const date = new Date();
	const year = date.getFullYear();
	const sYear = `${year}`.slice(2, 4);
	const month = date.getMonth() + 1;
	const sMonth = `${month}`.length === 1 ? `0${month}` : `${month}`;
	const day = date.getDate();
	const sDay = `${day}`.length === 1 ? `0${day}` : `${day}`;
	const hour = date.getHours();
	const sHour = `${hour}`.length === 1 ? `0${hour}` : `${hour}`;
	const minute = date.getMinutes();
	const sMinute = `${minute}`.length === 1 ? `0${minute}` : `${minute}`;
	const second = date.getSeconds();
	const sSecond = `${second}`.length === 1 ? `0${second}` : `${second}`;
	const fullString = `${sYear}${sMonth}${sDay}${sHour}${sMinute}${sSecond}`;
	const fullStringWithDash = `${year}${sMonth}${sDay}-${sHour}${sMinute}${sSecond}`;
	return {
		year,
		month,
		day,
		hour,
		minute,
		second,
		fullString,
		fullStringWithDash,
		fullWithExtension: (postfix: string) => `${fullStringWithDash}.${postfix}`,
		sample: (extension: string) => `currentTime.${extension}`
	};
};

export {
	getCurrentTime,
};