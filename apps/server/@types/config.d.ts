import "config";
import configJson from "../config/default.json";
import { NestedKeyOf, NestedTypeOf } from "./utils";

type ConfigJson = typeof configJson;

export type ConfigKeys = NestedKeyOf<ConfigJson>;
export type ConfigType<Key extends ConfigKeys> = NestedTypeOf<ConfigJson, Key>;

declare module "config" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  export interface IConfig {
    get<T extends ConfigType<S>, S extends ConfigKeys>(setting: S): T;
    has(setting: ConfigKeys): boolean;
  }
}
