import Replicate from "replicate";

import { prisma } from '../../lib/db';

export const generateImage = async (animal, text) => {
    const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
    });
    const output = await replicate.run(
        "stability-ai/sdxl:7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc",
        {
            input: {
                prompt: `a pass photo of a ${animal} wearing a t-shirt with printed slogan text -> "${text}" and slogan can be read clearly `,
            },
        }
    );

    return output
};

export async function POST(req) {
  const { animal, text } = await req.json();

  if (!animal || !text) {
    return Response.json({ error: 'Missing animal or text' }, { status: 400 });
  }

  const imageUrl = await generateImage(animal, text);

  if (!imageUrl) {
    return Response.json({ error: 'Failed to generate image' }, { status: 500 });
  }
  
  const imageUrlString = String(imageUrl);

  try {
    await prisma.history.create({
      data: {
        animal: animal,
        slogan: text,
        imageUrl: imageUrlString
      }
    });
  } catch (error) {
    return Response.json({ error: 'Failed to save image to database with error ' + error  }, { status: 500 });
  } 

  return Response.json({ 
    "message": "Image generated successfully",
    "data": {
      "image_url": imageUrlString
    }
   }, { status: 200 });
}