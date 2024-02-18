import { z } from 'zod';
//zod
export const User = z.object({

    id: z.number(),
    name: z.string(),
    email: z.string(),
    balance: z.number(),
    createdAt: z.date(),
    password: z.string(),

});

export const Transaction = z.object({
    id: z.number(),
    senderId: z.number(),
    receiverId: z.number(),
    amount: z.number(),
    timestamp: z.date(),
    sender: User,
    receiver: User
});



export type UserType = typeof User;
export type TransactionType = typeof Transaction;