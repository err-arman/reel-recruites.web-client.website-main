import { ServerFileProvider, ServerFileReference } from "../gql-types/graphql";

export const getFileUrl = (
  obj: ServerFileReference,
  type: "image" | "video" = "image"
) => {
  if (obj?.provider === "direct") {
    return obj.path;
  }

  if (obj?.provider === ServerFileProvider.Cloudinary) {
    return `https://res.cloudinary.com/dh5940zj7/${type}/upload/${obj.path}`;
  }

  if (obj?.provider === ServerFileProvider.CloudflareR2) {
    return `https://cdn.reel-recruits.com/${obj.path}`;
  }

  return "/images/logo-white-bg.jpg";
};
