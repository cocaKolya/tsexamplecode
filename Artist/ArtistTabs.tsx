import { Chip, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { FC } from 'react';
import Link from 'next/link';
import {
  ArtistTabProps,
  QueryViewTypes,
  TABS_CONDITIONS,
  TABS_ORDER,
  TAB_NAMES,
} from './artistTabTypes';
import { ParsedUrlQuery } from 'querystring';

const isActive = (query: ParsedUrlQuery, tab: QueryViewTypes, index: number) => {
  return query.view === tab || (query.view === undefined && index === 0);
};

export const ArtistToggler: FC<ArtistTabProps> = ({ blogPosts, artist }) => {
  const { query } = useRouter();

  return (
    <Stack direction="row" spacing={1}>
      {TABS_ORDER.filter((tab) => TABS_CONDITIONS[tab](artist, blogPosts)).map(
        (tab, index) => {
          return (
            <Link
              key={tab}
              href={`/artists/profile/${query.artistSlug}?view=${tab}`}
              scroll={false}
              passHref
            >
              <Chip
                component="a"
                color={isActive(query, tab, index) ? 'primary' : 'default'}
                label={TAB_NAMES[tab]}
              />
            </Link>
          );
        },
      )}
    </Stack>
  );
};
