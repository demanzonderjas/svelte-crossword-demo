export function resetGrid(grid) {
	return grid.reduce((base, next) => {
		const row = next.map(c => (c === "@" ? "@" : ""));
		base.push(row);
		return base;
	}, []);
}
