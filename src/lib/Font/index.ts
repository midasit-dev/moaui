import 'pretendard/dist/web/static/pretendard.css';
// import './index.css';

type FontSet = {
	fontFamily: string;
	letterSpacing: string;
	fontFeatureSettings: string;
}
class Font {
	static readonly fontFamily = "Pretendard, sans-serif";
	static readonly letterSpacing = "0rem"; /** 일괄적으로 변경하려면 수정 */
	static readonly fontFeatureSettings = "'clig' off, 'liga' off";
	static readonly defaultFontSet: FontSet = {
		fontFamily: this.fontFamily,
		letterSpacing: this.letterSpacing,
		fontFeatureSettings: this.fontFeatureSettings,
	}
}

export default Font;