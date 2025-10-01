import exprss from 'express'
import profile from '../controller/profileController.js';
import {protect, admin} from '../middleware/middleware.js';


const route = exprss.Router();


route.use('/createprofile', protect , profile);


export default route;