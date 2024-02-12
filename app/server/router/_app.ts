import { router } from '../trpc';
 
import { userRouter } from './user';
import { transactionRouter } from './transaction';
export const appRouter = router({
  transaction: transactionRouter,
  user: userRouter

})

export type AppRouter = typeof appRouter;