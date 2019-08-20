import { validate } from "../validators/focus";
import { crossword } from "../Crossword";
import { orientation } from "../Orientation";

let grid, orientation_value;

crossword.subscribe(val => (grid = val));

orientation.subscribe(val => (orientation_value = val));

function handleNav(e, prevFocus, nextFocus) {
	e.preventDefault();
	return validate(prevFocus, nextFocus, orientation_value, { isNav: true });
}

export function handleFocus(update, row, column, isCorrect, e) {
	return update(focus => {
		const keyHandler = handleNav.bind(null, e, focus);
		switch (e.key) {
			case "Tab":
				return keyHandler({
					row,
					column: column + 1
				});
			case "ArrowRight":
				return keyHandler({
					row,
					column: column + 1
				});
			case "ArrowLeft":
				return keyHandler({
					row,
					column: column - 1
				});
			case "ArrowDown":
				return keyHandler({
					row: row + 1,
					column
				});
			case "ArrowUp":
				return keyHandler({
					row: row - 1,
					column
				});
			case "Backspace":
				return handleBackspace(focus, isCorrect);
		}

		if (isCorrect) {
			const nextFocus = createNextFocus(
				{ row, column },
				orientation_value,
				"+"
			);
			return validate(focus, nextFocus, orientation_value);
		}

		return { row, column };
	});
}

export function handleClick(update, row, column, _orientation, e) {
	e.preventDefault();
	return update(focus => {
		let newOrientation;
		if (!orientation_value) {
			newOrientation = _orientation;
		} else {
			newOrientation =
				orientation_value == "horizontal" ? "vertical" : "horizontal";
		}
		return validate(focus, { row, column }, newOrientation);
	});
}

export function handleNext(update, _orientation, e) {
	return update(focus => {
		if (!e.data) {
			return focus;
		}
		const nextFocus = createNextFocus(focus, _orientation, "+");
		return validate(focus, nextFocus, _orientation);
	});
}

export function handleBackspace(focus, isCorrect) {
	const { row, column } = focus;
	if (!grid[row][column]) {
		const nextFocus = createNextFocus(focus, orientation_value, "-");
		return validate(focus, nextFocus, orientation_value);
	}

	const nextFocus = isCorrect
		? createNextFocus(focus, orientation_value, "-")
		: focus;

	return nextFocus;
}

function createNextFocus(focus, orientation, operator) {
	const { row, column } = focus;
	const operations = {
		"+": x => x + 1,
		"-": x => x - 1
	};
	return {
		row: orientation != "vertical" ? row : operations[operator](row),
		column:
			orientation != "vertical" ? operations[operator](column) : column
	};
}
