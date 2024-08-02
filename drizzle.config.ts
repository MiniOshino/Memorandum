import '@/drizzle/envConfig';
import { defineConfig } from 'drizzle-kit';

//console.log("THIS IS A TEST", process.env.POSTGRES_URL!);

export default defineConfig({
  schema: './src/drizzle/schema.ts',
  out: './src/drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL!
    //connectionString: process.env.POSTGRES_URL!,
  },
});