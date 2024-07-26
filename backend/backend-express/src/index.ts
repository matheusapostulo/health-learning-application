import express, {Request, Response} from 'express';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express();

// const createUser = async () => {
//     const data = await prisma.model.create({
//         data: {
//             modelName: 'Model Test',
//             description: 'Model Test Description',
//             createdAt: new Date("2021-09-01"),
//             updatedAt: new Date("2021-09-01"),   
//             parameters: 
//                 [
//                   { name: 'param1', type: 'type1' },
//                   { name: 'param2', type: 'type2' },
//                 ]  
//             ,
//         },
//     })
//     console.log(data)
// }

app.get('/', (req: Request, res: Response) => {
    // createUser();
    res.status(200).send('Server listening on port 3333!')
});

app.listen(3333, () => console.log('Server listening on port 3333!'));