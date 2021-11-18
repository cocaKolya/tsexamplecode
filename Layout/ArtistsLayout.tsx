import { Container, Stack } from '@mui/material';
import { Entry } from 'contentful';
import { IArtistCategoryFields } from 'framework/contentful/types';
import { FC } from 'react';
import { ArtistsCategoriesList } from '../ArtistsList/ArtistsCategoriesList';
import { ArtistsCountriesSelect } from '../ArtistsList/ArtistsCountriesSelect';
import { ArtistsHeader } from '../ArtistsList/ArtistsHeader';
import { Layout, LayoutProps } from './Layout';

type MyProps = {
  artistsCategories: Entry<IArtistCategoryFields>[];
  countryCodes: string[];
};

export const ArtistsLayout: FC<LayoutProps> = (props) => {
  const { artistsCategories, countryCodes } =
    props.pageProps as unknown as MyProps;
  return (
    <Layout
      {...props}
      headerSlot={
        <Container>
          <Stack sx={{ mb: 3 }} spacing={3}>
            <ArtistsHeader />
            <ArtistsCategoriesList categories={artistsCategories} />
            <div>
              <ArtistsCountriesSelect countryCodes={countryCodes} />
            </div>
          </Stack>
        </Container>
      }
    />
  );
};
