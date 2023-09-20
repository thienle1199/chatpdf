import type {Config} from "drizzle-kit"
import dotenv from "dotenv"

dotenv.config({
    path: ".env.local"
})

export default {
    driver: "mysql2",
    schema: "./src/lib/db/schema.ts",
    out: './src/lib/db/migrations',
    dbCredentials:{ 
        connectionString: process.env["DATABASE_URL"]!,
    },

} satisfies Config