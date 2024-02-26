import  Express  from "express";
import { deleteUser, getUsers, getuserbyid, signout, test } from "../controllers/user.controller.js";
import { updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = Express.Router();

router.get('/test',test);
router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout',signout);
router.get('/getusers', verifyToken , getUsers);
router.get('/getuser/:userId', getuserbyid);

export default router;

