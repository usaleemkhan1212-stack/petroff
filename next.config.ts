import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      // Import .svg files as React components so fill/stroke can be driven
      // by currentColor from the token classes. svgo is off to preserve the
      // exact geometry (width/height/viewBox) exported from Figma.
      "*.svg": {
        loaders: [{ loader: "@svgr/webpack", options: { svgo: false } }],
        as: "*.js",
      },
    },
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
