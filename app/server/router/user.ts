import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { prisma } from '@/prisma/client';



export const userRouter = router({
    // createPost: publicProcedure
        // .input(
        //     z.object({
        //         image: z.string(),
        //         body: z.string(),
        //         userId: z.string()
        //     }),
        // )
        // .mutation(async (opts) => {
        //     console.log(opts.input);
        //     const { image, body, userId } = opts.input
        //     const createPost = await prisma.post.create({
        //         data: {
        //             image, body, userId
        //         },
        //     });
        //     if (createPost) {
        //         return { status: "success", payload: createPost, msg: "Post Successfully Created" }
        //     }
        //     return { status: "failure", payload: {}, msg: "Internal Server Error" }

        // }),
    // getAllPosts: publicProcedure
    //     .mutation(async (opts) => {
            // const allPosts = await prisma.post.findMany({
            //     include:{user:true}
            // });
            // if (allPosts) {
            //     return { status: "success", payload: allPosts };
            // }
            // return { status: "failure", payload: {} }
//         })

});