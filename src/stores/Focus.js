import { writable } from "svelte/store";
import { handleFocus, handleClick, handleNext } from "./handlers/focus";
import { getInitialFocusCoords } from "./utils/getInitialFocusCoords";

function createFocusStore() {
	const initialFocus = getInitialFocusCoords();
	const { subscribe, set, update } = writable(initialFocus);

	const updateFocus = handleFocus.bind(null, update);
	const updateClick = handleClick.bind(null, update);
	const updateNext = handleNext.bind(null, update);

	return {
		subscribe,
		set,
		handleFocus: updateFocus,
		handleClick: updateClick,
		handleNext: updateNext
	};
}

export const focus = createFocusStore();
