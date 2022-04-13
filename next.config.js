/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
    domains: [
      "ibb.co",
      "links.papareact.com",
      "image.tmdb.org",
      "press.hulu.com",
      "keyassets.timeincuk.net",
      "sites.duke.edu",
      "imdb-api.com",
      "m.media-amazon.com",
    ],
  },
};

module.exports = nextConfig;
