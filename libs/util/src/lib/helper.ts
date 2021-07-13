export const autoCompleteTextFilter = (
  value: string,
  objectKeyName: string,
  object: Array<{ [key: string]: string | number }>
) => {
  const filterValue = value.toLowerCase();

  return object.filter((option: { [key: string]: string | number }) =>
    (option[objectKeyName] as string).toLowerCase().includes(filterValue)
  );
};
