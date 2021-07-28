export const getChartData = (from, to) => fetch(`/api/getRange?from=${from}&to=${to}`).then( res => res.json());
export const getConditions = () => fetch(`/api/getConditions`).then( res => res.json());
