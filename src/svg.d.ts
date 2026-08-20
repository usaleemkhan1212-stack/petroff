/** SVG files are compiled to React components by @svgr/webpack. */
declare module "*.svg" {
  const ReactComponent: import("react").FC<import("react").SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
