import { Hono } from 'hono';
import { userController } from '../controller/user-controller';
import { authMiddleware } from '../middleware/auth-middleware';

const userRouter = new Hono().basePath('/users');

userRouter.post('/register', userController.registerUser);
userRouter.use(authMiddleware)
userRouter.get("/", userController.getUsers)
export default userRouter;