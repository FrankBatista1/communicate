import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { Ratelimit } from "@upstash/ratelimit"; 
import { Redis } from "@upstash/redis";
import { filterUserForClient } from "~/server/helpers/filterUserForClient";

// Create a new ratelimiter, that allows 10 requests per 1 minute
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 m"),
  analytics: true,
});

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });

    const users = (
      await clerkClient.users.getUserList({
        limit: 100,
        userId: posts.map((post) => post.authorId),
      })
    ).map((user) => filterUserForClient(user));

    return posts.map((post) => {
      const author = users.find((user) => user.id === post.authorId);

      if (!author || !author.username)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Author for post not found",
        });
      
      return {
        post,
        author: {
          ...author,
          username: author.username,
        }
      };
    });
  }),
  create: privateProcedure.input(z.object({
    content: z.string().min(1, "Post must have at least 1 character").max(280, "Post must be less than 280 characters"),
  })).mutation(async ({ ctx, input }) => {
    const authorId = ctx.currentUserId;

    const { success } = await ratelimit.limit(authorId);
    if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

    const post = await ctx.prisma.post.create({
      data: {
        authorId,
        content: input.content
      },
    });
    return post;
  })
});
