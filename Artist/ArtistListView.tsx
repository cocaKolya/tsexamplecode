import { CountryFlag } from '@components/ui';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from '@mui/material';
import { getCountryName } from '@utils/getCountryName';
import { Entry } from 'contentful';
import { ContentfulPicture } from 'framework/contentful/components';
import { IArtistFields } from 'framework/contentful/types';
import { FC } from 'react';
import { InstagramBlurredButton } from '../InstagramBlurredButton';

export const ArtistListView: FC<{ artist: Entry<IArtistFields> }> = ({
  artist,
}) => {
  const { name, city, avatar, contacts, country } = artist.fields;
  return (
    <Card>
      <CardHeader
        title={name}
        avatar={
          <Avatar>
            <ContentfulPicture asset={avatar} width={96} />
          </Avatar>
        }
      />
      <Box
        sx={{
          maxWidth: 500,
          position: 'relative',
          height: 600,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          pb: 1,
        }}
      >
        {avatar && <ContentfulPicture asset={avatar} />}
        {contacts && <InstagramBlurredButton href={contacts[0]} />}
      </Box>
      <CardContent>
        <Stack direction="row" spacing={1} alignItems="center">
          {country && <CountryFlag countryCode={country} />}
          {country && (
            <Typography>
              {getCountryName(country, 'en-US')}, {city}
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};
