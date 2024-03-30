import express, {Request, Response} from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Server listening on port 3333!')
});

app.listen(3333, () => console.log('Server listening on port 3333!'));