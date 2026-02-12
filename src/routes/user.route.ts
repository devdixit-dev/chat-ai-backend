import express from 'express';
import uploader from '../middlewares/multer.middleware';
import { uploadPdfPipeline } from '../controllers/user.controller';

const UserRoute = express.Router();

UserRoute.post('/upload', uploader.single('document'), uploadPdfPipeline)

export default UserRoute;