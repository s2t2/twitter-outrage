require('dotenv').config(); // use environment variables from .env file

export default [
  {
    name: 'default',
    type: 'postgres',
    url:
      process.env.DATABASE_URL || 'postgresql://test:test@localhost:5432/test',
    synchronize: false,
    logging: false,
    cache: true,
    entities: ['src/entity/**/*.ts'],
    migrations: ['src/migration/**/*.ts'],
    cli: {
      entitiesDir: 'src/entity',
      migrationsDir: 'src/migration',
    },
  },
  {
    name: 'seed',
    type: 'postgres',
    url:
      process.env.DATABASE_URL || 'postgresql://test:test@localhost:5432/test',
    synchronize: false,
    logging: false,
    migrations: ['src/seed/*.ts'],
    cli: {
      migrationsDir: 'src/seed',
    },
  },
];
