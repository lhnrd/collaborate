import {
  IntersectEvaluate,
  IntersectReduce,
  Kind,
  SchemaOptions,
  TSchema,
  Type,
} from "@sinclair/typebox";

export type IntersectSchemaArray<T extends TSchema[]> = IntersectReduce<
  unknown,
  IntersectEvaluate<T, []>
>;

export type TIntersectAllOf<T extends TSchema[]> = ReturnType<
  typeof IntersectAllOf<T>
>;

export type IntersectAllOfOptions = SchemaOptions & {
  unevaluatedProperties?: boolean;
};
/**
 * @see https://github.com/sinclairzx81/typebox/issues/206
 */
export const IntersectAllOf = <T extends TSchema[]>(
  allOf: [...T],
  options: IntersectAllOfOptions = {}
) =>
  Type.Unsafe<IntersectSchemaArray<T>>({
    ...options,
    [Kind]: "IntersectAllOf",
    allOf,
  });
