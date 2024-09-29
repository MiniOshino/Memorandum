import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    schema: "./src/drizzle/schema.js",
    dialect: 'sqlite',
    dbCredentials: {
        url: './test.db',
    }
});
