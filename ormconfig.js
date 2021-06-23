module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: ['dist/entities/*.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
    entitiesDir: 'src/entities',
  },
};
