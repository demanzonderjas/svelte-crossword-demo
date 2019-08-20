import data from "../../data/config.json";

export function getInitialFocusCoords() {
	let coords = null;
	data.grid.some((row, rowIdx) => {
		return row.some((column, colIdx) => {
			if (column != "@") {
				coords = { row: rowIdx, column: colIdx };
				return true;
			}
			return false;
		});
	});
	return coords;
}
