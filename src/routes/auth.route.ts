import express from 'express';
import { AuthInit, AuthLogin, AuthLogout } from '../controllers/auth.controller';

const AuthRoute = express.Router();

AuthRoute.post('/init', AuthInit);

AuthRoute.post('/login', AuthLogin);

AuthRoute.post('/logout', AuthLogout);

export default AuthRoute;