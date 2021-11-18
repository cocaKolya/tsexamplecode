import { Entry } from 'contentful';
import { IArtistFields } from 'framework/contentful/types';

export const countrySelector = (
  artist: Entry<IArtistFields>,
  country?: string | string[] | undefined,
): Entry<IArtistFields> | null => {
  const selectedCountry = Array.isArray(country) ? country[0] : country;

  if (!selectedCountry || selectedCountry === 'All Countries') return artist;
  if (artist.fields.country === selectedCountry) return artist;
  return null;
};
