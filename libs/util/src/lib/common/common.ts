/**
 *
 * @param rawString raw string from user
 * @param deliminator to be separtaed
 * @param replaceWith concatinate with replaced text
 * @returns
 */
export const transformTextForGooglePlaceSearch = (
  rawString: string,
  deliminator: string,
  replaceWith: string
) => {
  /** remove all spces */

  const separateText = (
    rawString.split(deliminator) || []
  ).filter((accu: string) => accu.trim());

  return separateText.join(replaceWith) || '';
};

/*************
 * check keys
 */

export const convertSearchQueryToUrlQuery = (queryObject: {
  query: string;
  location?: string;
  radius?: number;
  type?: string;
}) => {
  const keys = Object.keys(queryObject);

  const joinedKeysValue = keys.map((accu) => {
    if (accu === 'query') {
      return `${accu}=${transformTextForGooglePlaceSearch(
        queryObject[accu],
        ' ',
        '+'
      )}`;
    }
    return `${accu}=${
      ((queryObject as unknown) as Array<string>)[(accu as unknown) as number]
    }`;
  });

  return joinedKeysValue.join('&');
};

/**
 * transform Place Search Response
 */

export const transformResponseOfPlaceSearch = async (resultObj: {
  [key: string]: string | Array<{ [key: string]: string }>;
}) => {
  const { results } = await resultObj;

  if (!results) {
    return [];
  }

  return (results as Array<{
    [key: string]: string;
  }>).map((accu: { [key: string]: string }) => {
    const { formatted_address, geometry, name, place_id } = accu;
    return {
      fullAddress: formatted_address,
      location: ((geometry as unknown) as {
        location: { lat: number; lng: number };
      })?.location,
      name: name,
      locationId: place_id,
    };
  });
};
