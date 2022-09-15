import { Object } from "ts-toolbelt";

export type KeyToPath<
  Key extends string | number,
  /* eslint-disable @typescript-eslint/ban-types */
  /* We need a no-type empty array to be able to spread without adding the array to the beginning */
  Path extends string[] = []
  /* eslint-enable @typescript-eslint/ban-types */
> = Key extends `${infer Head}.${infer Rest}`
  ? KeyToPath<Rest, [...Path, Head]>
  : [...Path, Key];

export type NestedKeyOf<ObjectType extends Record<string, unknown>> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends Record<
    string,
    unknown
  >
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : Key;
}[keyof ObjectType & (string | number)];

export type NestedTypeOf<
  ObjectType extends Record<string, unknown>,
  Key extends NestedKeyOf<ObjectType>
> = Object.Path<ObjectType, KeyToPath<Key>>;
