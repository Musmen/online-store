type hasSomeValuesType = (forSearchValuesList: unknown[], searchValue: string) => boolean;

export const hasSomeValues: hasSomeValuesType = (forSearchValuesList: unknown[], searchValue: string) =>
  forSearchValuesList.some((forSearchValue) =>
    String(forSearchValue).toLowerCase().includes(searchValue.toLowerCase())
  );
