import { createClient, SanityClient, type QueryParams } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";


export function client(previewToken?: string): SanityClient {
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: !previewToken,
    perspective: previewToken ? "previewDrafts" : "published",
    stega: {
      enabled: previewToken ? true : false,
      studioUrl: "/studio",
    },
    token: previewToken,
  });
}

export async function sanityFetch<T, const QueryString extends string>({
  query,
  params = {},
  revalidate = 60,
  tags = [],
  token = ''
}: {
  query: QueryString;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
  token?: string
}) {
  return client(token ? token : undefined).fetch<T>(query, params, {
    cache:
      revalidate === false && tags.length === 0 ? "force-cache" : "no-cache",
    next: {
      revalidate: tags.length ? false : revalidate,
      tags,
    },
  });
}
