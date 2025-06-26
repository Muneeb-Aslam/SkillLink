export function sortDataByFields(data: any, sortingCriteria: { fieldName: string, type: string }[]) {
  if(!sortingCriteria.length) return data;
  if (!data || !data.length) return [];
  return [...data]?.sort((a, b) => {
    for (const criteria of sortingCriteria) {
      const { fieldName, type } = criteria;
      if (fieldName === 'id' || fieldName === "Version name") {
        const comparisonResult = a[fieldName]?.localeCompare(b[fieldName], 'en', { numeric: true });
        if (comparisonResult !== 0) {
          return type === 'asc' ? comparisonResult : -comparisonResult;
        }
      }
    
      else {
        if (a[fieldName] < b[fieldName]) {
          return type === 'asc' ? -1 : 1;
        }
        if (a[fieldName] > b[fieldName]) {
          return type === 'asc' ? 1 : -1;
        }
      }
    }
    return 0;
  });
}