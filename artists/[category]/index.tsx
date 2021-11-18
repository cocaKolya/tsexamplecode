import { ArtistCard, EmptyArtistsList } from '@components/common';
import { ArtistsLayout } from '@components/common/Layout/ArtistsLayout';
import { Container, Grid } from '@mui/material';
import { countrySelector } from '@utils/countrySelector';
import { fetchArtistsCategoryPageInfo } from '@utils/fetchArtistsCategoryPageInfo';
import { contenfulClient } from 'framework/contentful';
import type { IArtistCategoryFields } from 'framework/contentful/types';
import type {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { useRouter } from 'next/router';

export async function getStaticPaths({
  locales,
}: GetStaticPathsContext): Promise<GetStaticPathsResult> {
  const artistsCategories =
    await contenfulClient.getEntries<IArtistCategoryFields>({
      content_type: 'artistCategory',
    });
  if (locales === undefined) {
    return {
      paths: artistsCategories.items.map(
        (category) => `/artists/${category.fields.slug}`,
      ),
      fallback: 'blocking',
    };
  }
  return {
    paths: artistsCategories.items.map((category) => ({
      params: { category: category.fields.slug },
      locale: locales[0],
    })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({
  params,
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const { artists, artistsCategories, countryCodes } =
    await fetchArtistsCategoryPageInfo();
  const artistsFromCategories = params
    ? artists.filter((el) => el.fields.category.fields.slug === params.category)
    : artists;

  return {
    props: { artists: artistsFromCategories, artistsCategories, countryCodes },
    revalidate: 60,
  };
}
export default function CategoryArtists({
  artists,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { query } = useRouter();

  // guardian Clauses
  if (artists.length === 0) {
    return (
      <Container>
        <EmptyArtistsList />
      </Container>
    );
  }

  return (
    <Container>
      <Grid container sx={{ paddingBlockStart: 3 }} spacing={{ xs: 2, sm: 3 }}>
        {artists
          .filter((artist) => countrySelector(artist, query.country))
          .map((artist) => {
            return (
              <Grid key={artist.sys.id} item xs={6} sm={4} md={4} xl={3}>
                <ArtistCard artist={artist} />
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
}

CategoryArtists.Layout = ArtistsLayout;
