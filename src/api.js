export const getChartData = (from, to) => fetch(`/getRange?from=${from}&to=${to}`).then( res => res.json());
export const getConditions = (from, to) => fetch(`/getConditions`).then( res => res.json());