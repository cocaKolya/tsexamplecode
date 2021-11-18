import { SocialLinks } from 'social-links';
import { isAValidUrl } from './isAValidUrl';

export type Provider =
  | 'instagram'
  | 'linkedin'
  | 'twitter'
  | 'facebook'
  | 'youtube';

export type ParsedAsSocial = {
  nickname: string;
  href: string;
  provider: Provider;
};

export type ParsedAsNotSocial = {
  nickname: null;
  href: string;
  provider: null;
};

export const AVAILABLE_PROVIDERS: Provider[] = [
  'instagram',
  'linkedin',
  'twitter',
  'facebook',
  'youtube',
];

export const parseSocialMediaLink = (
  link: string,
): ParsedAsNotSocial | ParsedAsSocial | null => {
  const socialLinks = new SocialLinks();

  if (isAValidUrl(link)) {
    const url = new URL(link);
    const clearUrl = url.origin + url.pathname;
    const foundProvider = AVAILABLE_PROVIDERS.find((provider) =>
      socialLinks.isValid(provider, clearUrl),
    );
    if (foundProvider) {
      return {
        nickname: socialLinks.getProfileId(foundProvider, clearUrl),
        href: socialLinks.sanitize(foundProvider, clearUrl),
        provider: foundProvider,
      };
    }
    return { nickname: null, href: link, provider: null };
  }
  return null;
};
