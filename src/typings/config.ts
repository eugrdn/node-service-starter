interface DBConfig {
    name: string;
    host: string;
    dialect: string;
    username: string;
    password: string;
}

interface AuthConfig {
    saltRounds: number;
    secret: string;
}

export interface ProjectConfiig {
    servicePort: number;
    graphql: string;
    graphiql: string;
    database: DBConfig;
    auth: AuthConfig;
}
