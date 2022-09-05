import * as dotenv from "dotenv";

dotenv.config();

type NodeEnv = "development" | "production" | "test";

const env = (process.env.NODE_ENV ?? "development") as NodeEnv;
const port = process.env.SERVER_PORT;
const host = process.env.SERVER_HOST;

export { env, port, host };
