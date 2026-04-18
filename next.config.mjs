import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  serverExternalPackages: ["@sparticuz/chromium", "playwright-core"],
};

export default withMDX(nextConfig);
