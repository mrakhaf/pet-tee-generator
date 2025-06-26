import { prisma } from '../../lib/db';

export async function GET() {
    try {
        //find many with order by desc
        const history = await prisma.history.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            take: 3,
        });

        return Response.json({
            data: history,
            message: 'History fetched successfully'
        });
    } catch (error) {
        return Response.json({ error: 'Failed to fetch history with error ' + error  }, { status: 500 });
    }
}