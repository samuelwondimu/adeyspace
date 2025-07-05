import Layout from "@/components/Layout/layout";
import "@/styles/globals.css";
import { VisualEditing } from "@sanity/visual-editing/next-pages-router";
import type { AppProps } from "next/app";
import { lazy, Suspense } from "react";

export interface SharedPageProps {
  draftMode: boolean;
  token: string;
}

const PreviewProvider = lazy(() => import("@/components/post/PreviewProvider"));

export default function App({
  Component,
  pageProps,
}: AppProps<SharedPageProps>) {
  const { draftMode, token } = pageProps;

  return draftMode ? (
    <PreviewProvider token={token}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Suspense>
        <VisualEditing />
      </Suspense>
    </PreviewProvider>
  ) : (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
