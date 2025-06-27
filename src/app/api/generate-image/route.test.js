import Replicate from 'replicate';
import { generateImage, POST } from './route.js';
import { prisma } from '../../lib/db';

jest.mock('replicate');
jest.mock('../../lib/db', () => ({
  prisma: {
    history: {
      create: jest.fn(),
    },
  },
}));

describe('generateImage', () => {
  it('returns the image URL from replicate output', async () => {
    const mockRun = jest.fn().mockResolvedValue(['https://example.com/image.jpg']);
    Replicate.mockImplementation(() => ({
      run: mockRun,
    }));

    const result = await generateImage('cat', 'yolo');
    expect(result).toStrictEqual(['https://example.com/image.jpg']);
  });
});

describe('POST', () => {
  it('should return 400 if animal or text is missing', async () => {
    const req = {
      json: jest.fn().mockResolvedValue({}),
    };

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe('Missing animal or text');
  });

  it('should return 500 if image generation fails', async () => {
    const req = {
      json: jest.fn().mockResolvedValue({ animal: 'dog', text: 'woof' }),
    };

    Replicate.mockImplementation(() => ({
      run: jest.fn().mockResolvedValue(null),
    }));

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(500);
    expect(data.error).toBe('Failed to generate image');
  });

  it('should return 500 if saving to DB fails', async () => {
    const req = {
      json: jest.fn().mockResolvedValue({ animal: 'dog', text: 'woof' }),
    };

    Replicate.mockImplementation(() => ({
      run: jest.fn().mockResolvedValue('http://image.url'),
    }));

    prisma.history.create.mockRejectedValue(new Error('DB error'));

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(500);
    expect(data.error).toMatch(/Failed to save image/);
  });

  it('should return 200 with image_url if all succeeds', async () => {
    const req = {
      json: jest.fn().mockResolvedValue({ animal: 'dog', text: 'woof' }),
    };

    Replicate.mockImplementation(() => ({
      run: jest.fn().mockResolvedValue('http://image.url'),
    }));

    prisma.history.create.mockResolvedValue({});

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.message).toBe('Image generated successfully');
    expect(data.data.image_url).toBe('http://image.url');
  });
});
