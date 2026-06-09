import dotenv from 'dotenv'
import pgPromise from 'pg-promise';

dotenv.config();

const pgp = pgPromise({});

const databaseUrl =
  process.env.DATABASE_URL ||
  process.env.DATABASE_PRIVATE_URL ||
  process.env.POSTGRES_URL;

const useSsl =
  process.env.PGSSLMODE === 'require' ||
  process.env.PGSSL === 'true' ||
  process.env.NODE_ENV === 'production';

const sslConfig = useSsl ? { rejectUnauthorized: false } : undefined;

const db = pgp(
  databaseUrl
    ? {
        connectionString: databaseUrl,
        ssl: sslConfig,
      }
    : {
        host: process.env.PGHOST,
        port: Number(process.env.PGPORT),
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        user: process.env.PGUSER,
        ssl: sslConfig,
      },
);

db.connect()
  .then((obj) => {
    console.log('✅ Connected to PostgreSQL with pg-promise');
    obj.done();
  }).catch((error) => {
    console.error('❌ Database connection error:', error.message);
  })

export default db; 