import express from 'express';
import { AppDataSource } from './dataSource';  // Assuming this is your TypeORM data source setup
import { Recipe } from './Recipe';  // Recipe Entity (model)

const app = express();
app.use(express.json());

// Connect to the database
AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => console.log('Error during Data Source initialization:', error));

// API endpoint to get all recipes (no filters, no pagination)
app.get('/api/recipes', async (req, res) => {
  try {
    // Fetch all recipes from the database
    const recipes = await AppDataSource.getRepository(Recipe).find();
    
    // Respond with the recipes
    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong while fetching recipes' });
  }
});


// I need a way too query a min and max value for calories but I dont think it needs to be one request
// I need a way to 

app.get('/api/recipes', async (req, res) => {
  const { min_calories, max_calories } = req.query;

  try {
    const queryBuilder = AppDataSource.getRepository(Recipe).createQueryBuilder('recipe');

    if (min_calories) {
      queryBuilder.andWhere('recipe.calories >= :min_calories', { min_calories: Number(min_calories) });
    }

    if (max_calories) {
      queryBuilder.andWhere('recipe.calories <= :max_calories', { max_calories: Number(max_calories) });
    }

    const recipes = await queryBuilder.getMany();
    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong while fetching recipes' });
  }
});


// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
function async(req: any, res: any): import("express-serve-static-core").RequestHandler<{}, any, any, import("qs").ParsedQs, Record<string, any>> {
  throw new Error('Function not implemented.');
}

