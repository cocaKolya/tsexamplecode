import { FC, useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { Head } from '@components/common';
import { ManagedUIContext } from '@components/ui/context';
import { EmotionCache } from '@emotion/utils';
import { createEmotionCache, creatingFreelyTheme } from '../theme';
import { CacheProvider } from '@emotion/react';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { CanvasParticles } from '@components/common';

const EmptyLayout: FC = ({ children }) => <>{children}</>;
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const HACKY_STYLES = {
  /**
   * Chrome has a bug with transitions on load since 2012!
   *
   * To prevent a "pop" of content, you have to disable all transitions until
   * the page is done loading.
   *
   * https://lab.laukstein.com/bug/input
   * https://twitter.com/timer150/status/1345217126680899584
   */
  '& *': { transition: 'none !important' },
};

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Layout = (Component as any).Layout || EmptyLayout;
  const [chromeBugHack, setChromBugHack] = useState(true);
  useEffect(() => {
    setChromBugHack(false);
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head />
      <ThemeProvider theme={creatingFreelyTheme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            body: chromeBugHack && HACKY_STYLES,
            a: {
              textDecoration: 'none',
              color: 'inherit',
            },
          }}
        />
        <CanvasParticles />
        <ManagedUIContext>
          <Layout pageProps={pageProps}>
            <Component {...pageProps} />
          </Layout>
        </ManagedUIContext>
      </ThemeProvider>
    </CacheProvider>
  );
}
