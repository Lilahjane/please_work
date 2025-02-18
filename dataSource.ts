import { DataSource } from 'typeorm';
import { Recipe } from './Recipe';
import { Ingredient } from './Ingredient';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: '_RECIPES_FINAL.db', // Path to your SQLite database
  synchronize: true, // Set to false in production to avoid auto schema changes
  logging: true,
  entities: [Recipe, Ingredient],
  migrations: [],
  subscribers: [],
});
