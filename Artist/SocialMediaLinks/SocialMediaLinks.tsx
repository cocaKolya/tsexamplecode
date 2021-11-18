import { Stack } from '@mui/material';
import { ParsedAsNotSocial, ParsedAsSocial } from '@utils/parseSocialMediaLink';
import { isntNullTypeGuard } from '@utils/typeguards';
import { FC } from 'react';
import { SocialMediaIconLink } from './SocialMediaIconLink';



export type SocialMediaLinksProps = {
  links: (ParsedAsNotSocial | ParsedAsSocial | null)[];
};

export const SocialMediaLinks: FC<SocialMediaLinksProps> = (props) => {
  return (
    <Stack direction="row" spacing={2}>
      {props.links.filter(isntNullTypeGuard).map((link) => {
        return <SocialMediaIconLink key={link.href} link={link} />;
      })}
    </Stack>
  );
};
