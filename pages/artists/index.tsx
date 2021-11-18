import { ArtistCard, EmptyArtistsList } from '@components/common';
import { ArtistsLayout } from '@components/common/Layout/ArtistsLayout';
import { Container, Grid } from '@mui/material';
import { countrySelector } from '@utils/countrySelector';
import { fetchArtistsCategoryPageInfo } from '@utils/fetchArtistsCategoryPageInfo';
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const props = await fetchArtistsCategoryPageInfo();

  return {
    props,
    revalidate: 60,
  };
}
export default function Artists({
  artists,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { query } = useRouter();
  if (artists.length === 0) {
    return (
      <Container>
        <EmptyArtistsList />
      </Container>
    );
  }

  return (
    <Container>
      <Grid
        container
        sx={{ paddingBlockStart: 3 }}
        spacing={{ xs: 2, sm: 3 }}
        rowSpacing={5}
      >
        {artists
          .filter((artist) => countrySelector(artist, query.country))
          .map((artist) => {
            return (
              <Grid key={artist.sys.id} item xs={6} sm={4} md={3} xl={3}>
                <ArtistCard artist={artist} />
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
}

Artists.Layout = ArtistsLayout;
