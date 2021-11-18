export const getCountryName = (
  countryCode: string,
  locales?: string | string[] | undefined
): string => {
  try {
    // https://github.com/microsoft/TypeScript/issues/41338
    // @ts-ignore
    const countryObject = new Intl.DisplayNames(locales, {
      type: 'region',
    })
    return countryObject.of(countryCode)
  } catch {
    return countryCode
  }
}
