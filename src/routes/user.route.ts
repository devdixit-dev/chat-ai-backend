import express from 'express';
import uploader from '../middlewares/multer.middleware';

const UserRoute = express.Router();

UserRoute.post('/upload', uploader.single('document'), )

export default UserRoute;