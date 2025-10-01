import  {register, login}  from '../controller/authController.js';

import express from 'express';


const route = express.Router();

route.use('/register', register);
route.use('/login',  login);


export default route;

