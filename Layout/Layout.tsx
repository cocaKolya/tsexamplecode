import React, { FC, ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { CommerceProvider } from '@framework';
import { useUI } from '@components/ui/context';
import type { Page } from '@commerce/types/page';
import { Navbar, Footer } from '@components/common';
import type { Category } from '@commerce/types/site';
import ShippingView from '@components/checkout/ShippingView';
import { useAcceptCookies } from '@lib/hooks/useAcceptCookies';
import PaymentMethodView from '@components/checkout/PaymentMethodView';

import LoginView from '@components/auth/LoginView';
import { Button, Dialog, Drawer, Skeleton } from '@mui/material';
import { FeatureBarProps } from '@components/common/FeatureBar';

const Loading = () => (
  <div className="w-80 h-80 flex items-center text-center justify-center p-3">
    <Skeleton width={50} />
  </div>
);

const dynamicProps = {
  loading: Loading,
};

const SignUpView = dynamic(
  () => import('@components/auth/SignUpView'),
  dynamicProps,
);

const FeatureBar = dynamic<FeatureBarProps>(
  () =>
    import('@components/common/FeatureBar').then((module) => module.FeatureBar),
  dynamicProps,
);

export interface LayoutProps {
  pageProps: {
    pages?: Page[];
    categories: Category[];
  };
  headerSlot?: ReactNode;
}

const ModalUI: FC = () => {
  const { displayModal, closeModal, modalView } = useUI();
  return (
    <Dialog open={displayModal} onClose={closeModal}>
      {modalView === 'LOGIN_VIEW' && <LoginView />}
      {modalView === 'SIGNUP_VIEW' && <SignUpView />}
    </Dialog>
  );
};

const SidebarUI: FC = () => {
  const { displaySidebar, closeSidebar, sidebarView } = useUI();
  return (
    <Drawer open={displaySidebar} onClose={closeSidebar}>
      {sidebarView === 'PAYMENT_VIEW' && <PaymentMethodView />}
      {sidebarView === 'SHIPPING_VIEW' && <ShippingView />}
    </Drawer>
  );
};

export const Layout: FC<LayoutProps> = ({
  children,
  headerSlot,
  pageProps: { categories = [], ...pageProps },
}) => {
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies();
  const { locale = 'en-US' } = useRouter();
  const navBarlinks = categories.slice(0, 2).map((c) => ({
    label: c.name,
    href: `/search/${c.slug}`,
  }));

  return (
    <CommerceProvider locale={locale}>
      <div>
        <Navbar links={navBarlinks} />
        {headerSlot}
        <main>{children}</main>
        <Footer pages={pageProps.pages} />
        <ModalUI />
        <SidebarUI />
        <FeatureBar
          title="This site uses cookies to improve your experience. By clicking, you agree to our Privacy Policy."
          hide={acceptedCookies}
        >
          <Button onClick={() => onAcceptCookies()}>Accept cookies</Button>
        </FeatureBar>
      </div>
    </CommerceProvider>
  );
};

export default Layout;
