class Primary {
	readonly main = "#343A3F";
	readonly hover = "#5F666B";
	readonly focus = "#1E2429";
	readonly white = "#FFFFFF";
}

class Secondary {
	readonly main = "#4B9AF4";
}

class Text {
	readonly primary = "#1F2937";
	readonly secondary = "#4B5563";
	readonly third = "#79828E";
	readonly disable = "#BDC2C8";
}

class Component {
	readonly gray = "#C4C6C8";
	readonly gray_02 = "#E6E6E6";
	readonly gray_light = "#EEEEEE";
}

class Color {
	static readonly primary = new Primary();
	static readonly secondary = new Secondary();
	static readonly text = new Text();
	static readonly component = new Component();
}

export default Color;