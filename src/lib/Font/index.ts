type FontSet = {
	fontFamily: string;
	letterSpacing: string;
}
class Font {
	static readonly fontFamily = "Pretendard, sans-serif";
	static readonly letterSpacing = "-0.063.rem";
	static readonly defaultFontSet: FontSet = {
		fontFamily: this.fontFamily,
		letterSpacing: this.letterSpacing,
	}
}

export default Font;