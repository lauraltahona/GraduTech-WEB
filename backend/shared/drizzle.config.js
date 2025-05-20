import {defineConfig} from 'drizzle-kit'
import { config } from 'dotenv';

import {DBCONNECT} from '../config'
config({ path: '../.env' });

console.log(DBCONNECT);


export default defineConfig({
    schema:'./backend/shared/schema.ts',
    out:'./backend/shared/migrations',
    dialect:'mysql',
    dbCredentials:{
        url:process.env.DATABASE_URL
    }
})