/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useRouter } from 'next/router';
import {
  ArtistTabProps,
  QueryViewTypes,
  TABS_CONDITIONS,
  TABS_ORDER,
} from './artistTabTypes';
import { FC } from 'react';
import { RichText } from 'framework/contentful/components';
import { BlogSnippetCard } from '..';
import { Document } from '@contentful/rich-text-types';
import { Asset, EntryCollection } from 'contentful';
import { IBlogPostFields } from 'framework/contentful/types';

export type ArtistContentProps = {
  tab: QueryViewTypes;
  biography: Document;
  artworks: Asset[];
  blogPosts: EntryCollection<IBlogPostFields>;
};

const ArtistTabContentSwitch: FC<ArtistContentProps> = ({
  tab,
  biography,
  artworks,
  blogPosts,
}) => {
  if (tab === QueryViewTypes.Biography) {
    return <RichText document={biography} />;
  }
  if (tab === QueryViewTypes.Portfolio) {
    // return <Portfolio artworks={artworks} />;
    return <div>artworks: {artworks.length}</div>;
  }
  if (tab === QueryViewTypes.Articles) {
    return (
      <>
        {blogPosts.items.map((post) => (
          <BlogSnippetCard key={post.fields.slug} blogPost={post} />
        ))}
      </>
    );
  }
  return null;
};

export const ArtistsTabContent: FC<ArtistTabProps> = ({
  blogPosts,
  artist,
}) => {
  const { query } = useRouter();
  if (query.view === undefined) {
    const firstAvailableTab = TABS_ORDER.find((tab) =>
      TABS_CONDITIONS[tab](artist, blogPosts),
    );

    if (firstAvailableTab) {
      return (
        <ArtistTabContentSwitch
          tab={firstAvailableTab}
          biography={artist.fields.biography!}
          artworks={artist.fields.artworks!}
          blogPosts={blogPosts!}
        />
      );
    }
    return <div>no content yet</div>;
  }
  if (Array.isArray(query.view)) {
    return <div>404 not found</div>;
  }
  const tab = query.view as QueryViewTypes | undefined;
  if (
    tab &&
    TABS_ORDER.includes(tab) &&
    TABS_CONDITIONS[tab](artist, blogPosts)
  ) {
    return (
      <ArtistTabContentSwitch
        tab={tab}
        biography={artist.fields.biography!}
        artworks={artist.fields.artworks!}
        blogPosts={blogPosts!}
      />
    );
  }
  return <div>404 not found</div>;
};
