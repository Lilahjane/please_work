import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Ingredient } from './Ingredient';

@Entity('recipes')
export class Recipe {
  @PrimaryColumn('text')
  id: string;

  @Column('text')
  recipe_name: string;

  @Column('text')
  recipe_photo: string;

  @Column('text')
  recipe_url: string;

  @Column('real')
  calories: number;

  @Column('real')
  carbohydrates: number;

  @Column('real')
  net_carbs: number;

  @Column('real')
  fat: number;

  @Column('real')
  protein: number;

  @Column('integer')
  sodium: number;

  @Column('text')
  prep_time: string;

  @Column('text')
  difficulty_level: string;

  @Column('text')
  spice_level: string;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.recipe)
  ingredients: Ingredient[];
}
