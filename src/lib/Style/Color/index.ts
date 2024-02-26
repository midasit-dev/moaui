class Primary {
	readonly main = "#343A3F";
	readonly hover = "#5F666B";
	readonly focus = "#1E2429";
	readonly white = "#FFFFFF";
	readonly enable = "#EEEEEE";
	readonly enable_strock = "#C4C6C8";
}

class PrimaryNegative {
	readonly main = "#1E2429";
	readonly hover = "#5F666B";
	readonly focus = "#1E2429";
	readonly white = "#FFFFFF";
	readonly enable = "#343A3F";
	readonly enable_strock = "#1E2429";
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

class TextNegative {
	readonly primary = "#FFFFFF";
	readonly secondary = "#BDC2C8";
	readonly third = "#000000";
	readonly disable = "#4B5563";
}

class Component {
	readonly gray = "#C4C6C8";
	readonly gray_01 = "#D1D1D1";
	readonly gray_02 = "#E6E6E6";
	readonly gray_light = "#EEEEEE";
	readonly gray_dark = "#8F8F8F";
}

class Color {
	static readonly primary = new Primary();
	static readonly primaryNegative = new PrimaryNegative();
	static readonly secondary = new Secondary();
	static readonly text = new Text();
	static readonly textNegative = new TextNegative();
	static readonly component = new Component();
}

/** 
 * Color key, value
 */
export const ColorMap: Map<string, string> = new Map([
	["Color.primary.main", Color.primary.main],
	["Color.primary.enable", Color.primary.enable],
	["Color.primary.enable_strock", Color.primary.enable_strock],
	["Color.primary.focus", Color.primary.focus],
	["Color.primary.hover", Color.primary.hover],
	["Color.primary.white", Color.primary.white],
	["Color.primaryNegative.main", Color.primaryNegative.main],
	["Color.primaryNegative.enable", Color.primaryNegative.enable],
	["Color.primaryNegative.enable_strock", Color.primaryNegative.enable_strock],
	["Color.primaryNegative.focus", Color.primaryNegative.focus],
	["Color.primaryNegative.hover", Color.primaryNegative.hover],
	["Color.primaryNegative.white", Color.primaryNegative.white],
	["Color.secondary.main", Color.secondary.main],
	["Color.text.primary", Color.text.primary],
	["Color.text.secondary", Color.text.secondary],
	["Color.text.third", Color.text.third],
	["Color.text.disable", Color.text.disable],
	["Color.textNegative.primary", Color.textNegative.primary],
	["Color.textNegative.secondary", Color.textNegative.secondary],
	["Color.textNegative.third", Color.textNegative.third],
	["Color.textNegative.disable", Color.textNegative.disable],
	["Color.component.gray", Color.component.gray],
	["Color.component.gray_01", Color.component.gray_01],
	["Color.component.gray_02", Color.component.gray_02],
	["Color.component.gray_light", Color.component.gray_light],
	["Color.component.gray_dark", Color.component.gray_dark],
] as const)

export default Color;