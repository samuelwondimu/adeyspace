import { LiveQueryProvider } from "next-sanity/preview";
import { useMemo } from "react";

import { client } from "@/sanity/lib/client";

export default function PreviewProvider({
  children,
  token,
}: {
  children: React.ReactNode;
  token: string;
}) {
  const sanityClient = useMemo(() => client(token), [token]);

  return (
    <LiveQueryProvider client={sanityClient}>{children}</LiveQueryProvider>
  );
}
