import { Router, Request, Response } from "express";
import { Users } from "../modules/user.entity"
const userRouter = Router();

//post users
userRouter.post('/users', (req,res)=>{
    const user = req.body;
    user.push(user);
    res.status(201).json(user);
});

//get users by id
userRouter.get('/users/:id',async (req: Request,res: Response)=> {
    const user= Users.find((u: { id: string; }) =>u.id === req.params.id);
    if(Users){
        res.status(200).json(user);
    }else {
        res.status(404).json('User not found');
    }
});

//get all users
userRouter.get('/users', async (req: Request, res: Response)=>{
    res.status(200).json(Users);
});
 
//update a user
userRouter.put('/users/:id', async(req: Request, res: Response)=>{
    const userId = parseInt(req.params.id);
    const { name } = req.body;

    const userIndex = Users.findIndex((user: { id: number; }) => user.id === userId);

    if (userId !== -1){
        //
        res.status(200).json({ message: 'User updated successfully' });
    }else {
        res.status(404).json({ message: 'User not found' });
    }
});


//deelete a user
userRouter.delete('/users/:id', async (req:Request, res: Response)=> {
    const userId = parseInt(req.params.id);

    if (userId!== -1){
        Users.splice(Users, 1);
        res.status(200).json({ message: 'User deleted successfully' });
    }else{
        res.status(404).json({ message: 'User not found' });
    }
});

export default userRouter;
