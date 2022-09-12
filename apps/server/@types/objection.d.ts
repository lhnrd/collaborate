import "objection";

declare module "objection" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface ModelClass {
    outputSchema: JSONSchema;
    inputSchema: JSONSchema;
  }
}
