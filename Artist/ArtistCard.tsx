import { StyledImageWrapper } from '@components/ui';
import { Button, CardActionArea, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Entry } from 'contentful';
import { ContentfulPicture } from 'framework/contentful/components';
import { IArtistFields } from 'framework/contentful/types';
import Link from 'next/link';
import { FC } from 'react';
import { ArtistAvatarName } from '.';
import { InstagramBlurredButton } from '../InstagramBlurredButton';
import { useMainAsset } from './useMainAsset';

type StyleProps = {
  variant?: 'featured';
};

const StyledActionArea = styled(CardActionArea)<StyleProps>(({ theme }) => ({
  height: '100%',
  position: 'absolute',
  left: 0,
  top: 0,
}));

const StyledInstagramWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'absolute',
  zIndex: 2,
  left: 0,
  bottom: theme.spacing(3),
  width: '100%',
  justifyContent: 'center',
}));

export interface ArtistCardProps {
  artist: Entry<IArtistFields>;
  variant?: 'featured';
}

export const ArtistCard: FC<ArtistCardProps> = ({ artist, variant }) => {
  const mainAsset = useMainAsset(artist);
  const href = `/artists/profile/${artist.fields.slug}`;
  return (
    <Stack spacing={variant === 'featured' ? 3 : 2}>
      <StyledImageWrapper
        radius={variant === 'featured' ? 'featured' : 'even'}
        ratio={variant === 'featured' ? 'golden' : 'square'}
      >
        <Link href={href} passHref>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <StyledActionArea component="a" variant={variant}>
            <ContentfulPicture asset={mainAsset} />
          </StyledActionArea>
        </Link>
        {variant === 'featured' && artist.fields?.contacts?.[0] && (
          <StyledInstagramWrapper>
            <InstagramBlurredButton
              href={artist.fields.contacts[0] as string}
            />
          </StyledInstagramWrapper>
        )}
      </StyledImageWrapper>
      <Link href={href} passHref>
        <a>
          <ArtistAvatarName artist={artist} />
        </a>
      </Link>
      {variant === 'featured' && (
        <>
          <Typography variant="body2" color="textSecondary">
            {artist.fields.summary}
          </Typography>
          <div>
            <Link href={href} passHref>
              <Button component="a" variant="outlined">
                Read more
              </Button>
            </Link>
          </div>
        </>
      )}
    </Stack>
  );
};
