declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.png" {
  const value: any;
  export default value;
}
