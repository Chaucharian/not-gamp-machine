const API_PORT = 8081;
export const getChartData = (from, to) => fetch(`http://localhost:${API_PORT}/not-gamp-machine/api/getRange?from=${from}&to=${to}`).then( res => res.json());
export const getConditions = () => fetch(`http://localhost:${API_PORT}/not-gamp-machine/api/getConditions`).then( res => res.text());