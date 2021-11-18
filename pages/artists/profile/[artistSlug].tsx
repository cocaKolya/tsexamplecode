import { ArtistAvatarName, BlogSnippetCard, Layout } from '@components/common';
import { ArtistsTabContent } from '@components/common/Artist/ArtistsTabContent';
import { ArtistToggler } from '@components/common/Artist/ArtistTabs';
import { SocialMediaLinks } from '@components/common/Artist/SocialMediaLinks';
import { Box, Container, Stack, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { getCountryName } from '@utils/getCountryName';
import {
  ParsedAsNotSocial,
  ParsedAsSocial,
  parseSocialMediaLink,
} from '@utils/parseSocialMediaLink';
import { Entry } from 'contentful';
import { contenfulClient } from 'framework/contentful';
import { ContentfulPicture, RichText } from 'framework/contentful/components';
import { IArtistFields, IBlogPostFields } from 'framework/contentful/types';
import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { useRouter } from 'next/router';

type GetSSRResult<TProps> =
  | { props: TProps }
  | { redirect: any }
  | { notFound: boolean }; // <-------

type GetSSRFn<TProps extends any> = (
  args: any,
) => Promise<GetSSRResult<TProps>>;

export type inferSSRProps<TFn extends GetSSRFn<any>> = TFn extends GetSSRFn<
  infer TProps
>
  ? NonNullable<TProps>
  : never;

export async function getStaticPaths({
  locales,
}: GetStaticPathsContext): Promise<GetStaticPathsResult> {
  const artists = await contenfulClient.getEntries<IArtistFields>({
    content_type: 'artist',
  });
  return {
    paths: artists.items
      .filter((artist) => artist.fields.slug !== undefined)
      .map((artist) => ({
        params: { artistSlug: artist.fields.slug },
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
  const [artist, artistBlogPosts] = await Promise.all([
    contenfulClient.getEntries<IArtistFields>({
      content_type: 'artist',
      'fields.slug': params?.artistSlug,
    }),
    contenfulClient.getEntries<IBlogPostFields>({
      content_type: 'blogPost',
      'fields.author.sys.contentType.sys.id': 'artist',
      'fields.author.fields.slug': params?.artistSlug,
    }),
  ]);
  const firstArtist = artist.items[0];

  if (!firstArtist) return { notFound: true };


  const contacts = artist?.items[0].fields?.contacts;
  const parsedContacts = contacts?.map((contact) =>
    parseSocialMediaLink(contact),
  );

  return {
    props: {
      artist: firstArtist,
      links: contacts ? parsedContacts : null,
      blogPosts: artistBlogPosts ? artistBlogPosts : undefined,
    },
    revalidate: 60,
  };
}

export default function ArtistSlug({
  artist,
  links,
  blogPosts,
}: inferSSRProps<typeof getStaticProps>) {

  const { avatar, country, city} = artist.fields;
  return (
    <Container>
      <MainGrid>
        <div>
          <StyledImage>
            <ContentfulPicture asset={avatar} />
          </StyledImage>
        </div>
        <Stack spacing={3} padding={3}>
          <ArtistAvatarName artist={artist} />
          <Typography variant="body2">
            {`${city},  ${country && getCountryName(country)}`}
          </Typography>
          {links && <SocialMediaLinks links={links} />}
          <ArtistToggler artist={artist} blogPosts={blogPosts} />
          <ArtistsTabContent artist={artist} blogPosts={blogPosts} />
        </Stack>
      </MainGrid>
    </Container>
  );
}

ArtistSlug.Layout = Layout;

const StyledImage = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-end',
  justifyContent: 'center',
  overflow: 'hidden',
  height: theme.spacing(52),
  paddingBlockEnd: theme.spacing(1),
  borderBottomLeftRadius: theme.spacing(6),
  borderBottomRightRadius: theme.spacing(6),
  [theme.breakpoints.up(800)]: {
    height: theme.spacing(40),
    borderRadius: theme.spacing(6),
  },
  [theme.breakpoints.up(1000)]: {
    height: theme.spacing(52),
    borderRadius: theme.spacing(6),
  },
  '& img': {
    // fixes long press on iOS
    WebkitTouchCallout: 'none',
  },
}));

const MainGrid = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(1),
  [theme.breakpoints.up(800)]: {
    paddingBlock: theme.spacing(9),
    gap: theme.spacing(1, 3),
    gridTemplateColumns: '1fr 1fr',
  },
}));
