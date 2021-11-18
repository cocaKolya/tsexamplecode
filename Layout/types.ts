import { FC } from 'react';

export interface PageFC<T> extends FC<T> {
  Layout: FC<{ pageProps: any }>;
}
