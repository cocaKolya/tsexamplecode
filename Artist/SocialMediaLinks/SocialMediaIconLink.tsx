import { IconButtonSocialMedia } from '@components/ui/Skeleton/IconButtonSocialMedia';
import { Link } from '@mui/material';
import { ParsedAsNotSocial, ParsedAsSocial } from '@utils/parseSocialMediaLink';
import { FC } from 'react';
import { useSocialIcon } from './useSocialIcon';

export type SocialMediaIconLinkProps = {
  link: ParsedAsNotSocial | ParsedAsSocial;
};

export const SocialMediaIconLink: FC<SocialMediaIconLinkProps> = (props) => {
  const icon = useSocialIcon(props.link.provider);

  return (
    <Link href={props.link.href}>
      <IconButtonSocialMedia>{icon}</IconButtonSocialMedia>
    </Link>
  );
};

//some changes
