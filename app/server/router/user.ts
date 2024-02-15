import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { prisma } from '@/prisma/client';
import { UserType } from '@/app/types/types';


export const userRouter = router({
    createUser: publicProcedure
        .input(
            z.object({
                name: z.string(),
                email: z.string(),
                password: z.string()
            }),
        )
        .output(z.object({
            status: z.string(),
            subject: z.string(),
            message: z.string(),
            payload: z.union([z.null(), z.object({
                id: z.number(),
                name: z.string(),
                email: z.string(),
                balance: z.number(),
                createdAt: z.date(),
                password: z.string(),
            })])

        })
        )
        .mutation(async (opts) => {

            const existingUser = await prisma.user.findUnique({
                where: {
                    email: opts.input.email
                }
            });

            if (existingUser) {
                // If a user with the provided email already exists
                const output = {
                    status: 'failure',
                    subject: 'error',
                    message: 'User with this email already exists',
                    payload: null
                };
                return output;
            } else {
                // If a user with the provided email doesn't exist, create a new user
                const newUser = await prisma.user.create({
                    data: opts.input
                });

                const output = {
                    status: 'success',
                    subject: 'success',
                    message: 'User created successfully',
                    payload: newUser
                };
                return output;
            }
        }),
    getAllUsers: publicProcedure
        .input(
            z.number()
        )
        .output(z.object({
            status: z.string(),
            subject: z.string(),
            message: z.string(),
            payload: z.union([
                z.null(),
                z.array(z.object({
                    id: z.number(),
                    name: z.string(),
                    email: z.string(),
                    balance: z.number(),
                    createdAt: z.date(),
                    password: z.string(),
                }))
            ])
        }))

        .mutation(async (opts) => {

            const userToExclude = await prisma.user.findUnique({
                where: {
                    id: opts.input // Assuming opts.input is the ID of the user to exclude
                }
            });

            if (!userToExclude) {
                // If the user with the provided ID doesn't exist
                const output = {
                    status: 'failure',
                    subject: 'error',
                    message: 'User not found',
                    payload: null
                };
                return output;
            }

            // Fetch all users except the one specified by the ID
            const allUsersExceptExcluded = await prisma.user.findMany({
                where: {
                    NOT: {
                        id: opts.input // Exclude the user with this ID
                    }
                }
            });

            const output = {
                status: 'success',
                subject: 'success',
                message: 'Users fetched successfully',
                payload: allUsersExceptExcluded
            };
            return output;
        }),




});