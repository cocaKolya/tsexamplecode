import { Avatar, Grid, Skeleton, Stack, Typography } from '@mui/material';
import { DraftableEntry } from 'framework/contentful';
import { getContentulImageSrc } from 'framework/contentful/components';
import { IArtistFields } from 'framework/contentful/types';
import { FC } from 'react';

export const ArtistAvatarName: FC<{ artist: DraftableEntry<IArtistFields> }> =
  ({ artist }) => {
    return (
      <Stack direction="row" alignItems="center" spacing={1}>
        <Avatar
          sx={{ width: 40, height: 40 }}
          src={getContentulImageSrc(artist.fields?.avatar)}
        />
        {/** https://mui.com/components/grid/#limitations */}
        <Grid item zeroMinWidth>
          <Typography variant="subtitle2" color="textPrimary" noWrap>
            {artist.fields?.name ?? <Skeleton animation={false} width={120} />}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {artist.fields?.category.fields?.name ?? (
              <Skeleton animation={false} width={120} />
            )}
          </Typography>
        </Grid>
      </Stack>
    );
  };
