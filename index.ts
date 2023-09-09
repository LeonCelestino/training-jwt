import express, { Express, Request, Response } from 'express';
import connectingToMongo from './config/db.config';
import dotenv from 'dotenv';
import userModel, { User } from './models/user.model';
import * as auth from './controllers/auth';
import * as token from './middleware/verifyToken'

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

connectingToMongo();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Server');
});

app.get('/users', token.verifyToken, async (req: Request, res: Response) => {
  try {
    const users: User[] = await userModel.find();
    console.log(users)
    res.json(users);

  } catch (err) {
    console.error(err);
    res.status(500).json({message: err})
  }

})

app.post('/signin', auth.signin);

app.post('/register', async (req: Request, res: Response) => {
  try {
    const userData= req.body;

    console.log(userData.password)

    await userModel.create(userData);
    
    res.json({message: req.body})

  } catch (err) {
    console.error(err);
    res.status(500).json({message: "Something went wrong when sending sampleData to your mongoDB: " + err})
  }
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
}); 
 