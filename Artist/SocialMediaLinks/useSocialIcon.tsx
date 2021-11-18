import { Provider } from '@utils/parseSocialMediaLink';
import { ReactNode, useMemo } from 'react';
import {
  AiFillInstagram,
  AiFillLinkedin,
  AiFillYoutube,
  AiOutlineTwitter,
} from 'react-icons/ai';
import { FiLink } from 'react-icons/fi';
import { SiFacebook } from 'react-icons/si';

type IconMap = Record<Provider, ReactNode>;

export const ICONS_MAP: IconMap = {
  facebook: <SiFacebook />,
  instagram: <AiFillInstagram />,
  twitter: <AiOutlineTwitter />,
  linkedin: <AiFillLinkedin />,
  youtube: <AiFillYoutube />,
};

export const useSocialIcon = (provider: Provider | null): ReactNode =>
  useMemo(() => {
    if (provider === null) {
      return <FiLink />;
    }
    return ICONS_MAP[provider];
  }, [provider]);

