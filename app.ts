import  express  from 'express';
import { AppDataSource } from './dataSource';
import { Recipe } from './Recipe';
import { Ingredient } from './Ingredient';

const app = express();
app.use(express.json());

// Connect to the database
AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => console.log('Error during Data Source initialization:', error));

// API endpoint to get all recipes with pagination and filters
app.get('/api/recipes', async (req, res) => {
  const { page = 1, limit = 12, difficulty_level, spice_level, min_calories, max_calories } = req.query;

  try {
    const queryBuilder = AppDataSource.getRepository(Recipe).createQueryBuilder('recipe');

    // Apply filters
    if (difficulty_level) {
      queryBuilder.andWhere('recipe.difficulty_level = :difficulty_level', { difficulty_level });
    }
    if (spice_level) {
      queryBuilder.andWhere('recipe.spice_level = :spice_level', { spice_level });
    }
    if (min_calories && max_calories) {
      queryBuilder.andWhere('recipe.calories BETWEEN :min_calories AND :max_calories', {
        min_calories,
        max_calories,
      });
    }

    // Pagination
    const recipes = await queryBuilder
      .skip((Number(page) - 1) * Number(limit))
      .take(Number(limit))
      .getMany();

    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong with  pagination' });
  }
});

// API endpoint to get ingredients for a specific recipe
app.get('/api/ingredients/:recipeId', async (req, res) => {
  const { recipeId } = req.params;

  try {
    const ingredients = await AppDataSource.getRepository(Ingredient).find({
      where: { recipe: { id: recipeId } },
    });

    res.json(ingredients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong with ingredient end point' });
  }
});

// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
