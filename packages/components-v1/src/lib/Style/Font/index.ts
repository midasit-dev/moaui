import "./pretendard.css";

type FontSet = {
  fontFamily: string;
  letterSpacing: string;
  fontFeatureSettings: string;
};
class Font {
  static readonly fontFamily = "Pretendard, sans-serif";
  static readonly letterSpacing = "0rem"; /** 일괄적으로 변경하려면 수정 */
  static readonly fontFeatureSettings = "'clig' off, 'liga' off";
  static readonly defaultFontSet: FontSet = {
    fontFamily: this.fontFamily,
    letterSpacing: this.letterSpacing,
    fontFeatureSettings: this.fontFeatureSettings,
  };

  static getFontSize = (size: "small" | "medium" | "large" | undefined) => {
    if (!size) return "0.75rem"; /** 12px */

    switch (size) {
      case "small":
        return "0.75rem"; /** 12px */
      case "medium":
        return "1rem"; /** 16px */
      case "large":
        return "1.375rem"; /** 22px */
      default:
        return "0.75rem";
    }
  };
}

export default Font;
