import * as joi from "joi";

interface EnvVars {
    PORT: number;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_HOST: string;
    DB_PORT: number;
}

const envsSchema = joi
    .object({
        PORT: joi.number().required(),
        DB_NAME: joi.string().required(),
        DB_USER: joi.string().required(),
        DB_PASSWORD: joi.string().required(),
        DB_HOST: joi.string().required(),
        DB_PORT: joi.number().required(),
    })
    .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: error`);
}

const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
    db: {
        name: envVars.DB_NAME,
        user: envVars.DB_USER,
        password: envVars.DB_PASSWORD,
        host: envVars.DB_HOST,
        port: envVars.DB_PORT,
    },
};
