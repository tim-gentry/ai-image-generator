import express from 'express';
import cors from 'cors';
import router from './Routes/image.routes';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/generate-image', router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

export default app;

