interface RouteMetadataOptions {
  title: string;
  description: string;
  noIndex?: boolean;
}

export function createRouteMetadata({
  title,
  description,
  noIndex = false,
}: RouteMetadataOptions) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      {
        name: "robots",
        content: noIndex ? "noindex, nofollow" : "index, follow",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "AuthLab" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
  };
}
