import { Entry, EntryCollection } from 'contentful';
import { IArtistFields, IBlogPostFields } from 'framework/contentful/types';

export enum QueryViewTypes {
  Biography = 'biography',
  Articles = 'articles',
  Portfolio = 'portfolio',
}

export type ArtistTabProps = {
  artist: Entry<IArtistFields>;
  blogPosts: EntryCollection<IBlogPostFields> | undefined;
  tab?: string;
};

// что такое entry разница с artistFields
// что такое entryCollection и как в неe попадают entry и artistFields

export const TAB_NAMES: Record<QueryViewTypes, string> = {
  biography: 'Biography',
  portfolio: 'Portfolio',
  articles: 'Articles',
};

export const TABS_ORDER: QueryViewTypes[] = [
  QueryViewTypes.Biography,
  QueryViewTypes.Articles,
  QueryViewTypes.Portfolio,
];

export const TABS_CONDITIONS: Record<QueryViewTypes, ShouldShowFn> = {
  biography: (artist) => artist.fields.biography !== undefined,
  portfolio: (artist) =>
    artist.fields.artworks !== undefined && artist.fields.artworks.length > 0,
  articles: (artist, blogPosts) =>
    blogPosts !== undefined && blogPosts.items.length > 0,
};

type ShouldShowFn = (
  artist: Entry<IArtistFields>,
  blogPosts?: EntryCollection<IBlogPostFields> | undefined,
) => boolean;
