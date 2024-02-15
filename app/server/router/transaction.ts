import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { prisma } from '@/prisma/client';

export const transactionRouter = router({
    sendMoney: publicProcedure
        .input(
            z.object({
                senderId: z.number(),
                receiverId: z.number(),
                amount: z.number().positive(), // Ensure amount is positive
            }),
        )
        .output(
            z.object({
                status: z.string(),
                subject: z.string(),
                message: z.string(),
            }),
        )
        .mutation(async (opts) => {
            const { senderId, receiverId, amount } = opts.input;

            // Fetch sender and receiver details
            const sender = await prisma.user.findUnique({
                where: { id: senderId },
                select: { id: true, balance: true },
            });

            const receiver = await prisma.user.findUnique({
                where: { id: receiverId },
                select: { id: true, balance: true },
            });

            // Check if sender and receiver exist
            if (!sender || !receiver) {
                throw new Error('User not found');
            }

            // Check if sender has enough balance
            if (sender.balance < amount) {
                throw new Error('Insufficient balance');
            }

            // Start a transaction to update sender and receiver balances atomically
            try {
                await prisma.$transaction([
                    prisma.user.update({
                        where: { id: senderId },
                        data: { balance: { decrement: amount } }, // Decrement sender's balance
                    }),
                    prisma.user.update({
                        where: { id: receiverId },
                        data: { balance: { increment: amount } }, // Increment receiver's balance
                    }),
                ]);
                
                // Transaction succeeded, return success
                return {
                    status: 'success',
                    subject: 'success',
                    message: 'Money sent successfully',
                };
            } catch (error) {
                // Transaction failed, throw new Error
                throw new Error('An error occurred while processing the transaction');
            }
        }),
});
