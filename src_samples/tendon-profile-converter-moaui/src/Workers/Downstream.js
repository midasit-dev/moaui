import { loadData } from "../utils";
export const importTdnaFromProduct = async() => {
	const result = await loadData("/db/tdna");
	let tdnaData = {};
	let listData = {};
	if (result) {
		tdnaData = result["TDNA"];
		Object.entries(tdnaData).forEach(([key, value]) => {
			if (value["CURVE"] === "SPLINE" && value["SHAPE"] === "ELEMENT" && (value["INPUT"] === "3D" || value["INPUT"] === "2D")) {
				listData[key] = value;
			}
		});
	}

	return listData;
}