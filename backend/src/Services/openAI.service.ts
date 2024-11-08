import axios from 'axios';

interface OpenAIImageResponse {
    created: number,
    data: Array<{
        url: string
    }>
}

export async function generateImageService(prompt: string): Promise<OpenAIImageResponse> {
    const API_KEY = process.env.OPENAI_API_KEY;
    const url = 'https://api.openai.com/v1/images/generations'
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
    };

    const data = {
        prompt,
        num_images: 1,
        size: '512x512',
        response_format: 'url',
        style: 'vivid'
    };

    try {
        const response: any = await axios.post(url, data, { headers })
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.error?.message || 'OpenAI API request failed.'
        );
    }
}
