import {GET} from "./route";
import { prisma } from '../../lib/db';

jest.mock('../../lib/db', () => ({
    prisma: {
        history: {
            findMany: jest.fn(),
        },
    },
}));

describe('GET', () => {
    it('should return the history', async () => {
        const response = await GET();
        expect(response.status).toBe(200);
    });
    it('should error', async () => {
        prisma.history.findMany.mockRejectedValue(new Error('error'));
        const response = await GET();
        expect(response.status).toBe(500);
    })
});