import { Config, getFunctions, getSchemaCreator } from "nobox-client";

const NOBOX_TOKEN = process.env.NOBOX_TOKEN;


const config: Config = {
    endpoint: "https://api.nobox.cloud",
    project: "gettingStarted",
    token: NOBOX_TOKEN as string,
};


const createRowSchema = getSchemaCreator(config, { type: "rowed" });
const createKeyGroupSchema = getSchemaCreator(config, { type: "key-group" });

const Nobox = getFunctions(config);

export { config, createRowSchema, createKeyGroupSchema, Nobox};