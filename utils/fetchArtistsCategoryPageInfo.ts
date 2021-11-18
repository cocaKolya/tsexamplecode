import { Entry } from 'contentful';
import { contenfulClient } from 'framework/contentful';
import {
  IArtistCategoryFields,
  IArtistFields,
} from 'framework/contentful/types';

function isStringTypeGuard(x: any): x is string {
  return typeof x === 'string';
}

export type ArtistsPageProps = {
  artists: Entry<IArtistFields>[];
  artistsCategories: Entry<IArtistCategoryFields>[];
  countryCodes: string[];
};

export const fetchArtistsCategoryPageInfo =
  async (): Promise<ArtistsPageProps> => {
    const [data, artistsCategories] = await Promise.all([
      contenfulClient.getEntries<IArtistFields>({
        content_type: 'artist',
      }),
      contenfulClient.getEntries<IArtistCategoryFields>({
        content_type: 'artistCategory',
      }),
    ]);
    const artists = data.items.filter(
      (artist) => Number(artist.fields.artworks?.length) > 0,
    );
    const allCountries = data.items
      .map((artist) => artist.fields.country)
      .filter(isStringTypeGuard);
    const filteredCountries = allCountries.filter((country, i) => {
      return allCountries.indexOf(country) === i;
    });

    return {
      artists,
      artistsCategories: artistsCategories.items,
      countryCodes: filteredCountries,
    };
  };
