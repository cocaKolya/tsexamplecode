import Image from 'next/image';
import { Box, Stack, Typography } from '@mui/material';
import { FC } from 'react';

export const EmptyArtistsList: FC = () => {
  return (
    <Stack sx={{ paddingTop: 5 }} spacing={1}>
      <Typography variant="h6">There are no Artists yet</Typography>
      <Typography variant="body1" color="textSecondary">
        Be the first!
      </Typography>
      <Box
        sx={{
          position: 'relative',
          flexGrow: 1,
          height: '60vh',
        }}
      >
        <Image
          unoptimized
          alt="Empty artist image"
          objectFit="contain"
          src="/assets/artists-empty-state.svg"
          layout="fill"
        />
      </Box>
    </Stack>
  );
};
