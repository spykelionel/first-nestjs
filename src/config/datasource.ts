import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'todo',
  entities: ['../../../dist/apps/**/data/*.entity.js'],
  migrations: ['../../../dist/db/migration/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
