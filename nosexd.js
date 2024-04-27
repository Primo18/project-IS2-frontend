import { createClient } from "@libsql/client";

const client = createClient({
  url: var_entorno_bd.md.TURSO_DATABASE_URL,
  authToken: var_entorno_bd.md.TURSO_DATABASE_AUTH_TOKEN,
});
