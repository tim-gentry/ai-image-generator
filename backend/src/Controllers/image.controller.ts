import { generateImageService } from '../Services/openAI.service';
import { Request, Response } from 'express'

export const generateImage = async (req: Request, res: Response) => {
    const { prompt } = req.body;

    try {
        const responseData = await generateImageService(prompt);
        const imageUrl = responseData.data[0].url;
        res.status(200).json({ imageUrl })
    } catch (error: any) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Failed to generate image.' });
    }
}


