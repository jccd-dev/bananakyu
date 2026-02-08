import { createClient } from "@/lib/supabase/server";
import { loginSchema, signUpSchema } from "@/lib/validations/auth";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const authRouter = createTRPCRouter({
  signUp: publicProcedure.input(signUpSchema).mutation(async ({ input }) => {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
      email: input.email,
      password: input.password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/auth/callback`,
      },
    });

    if (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }

    return {
      success: true,
      message: "Account created successfully",
      user: data.user,
    };
  }),

  login: publicProcedure.input(loginSchema).mutation(async ({ input }) => {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: input.email,
      password: input.password,
    });

    if (error) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: error.message,
      });
    }

    return {
      success: true,
      user: data.user,
    };
  }),

  /**
   * @description Logout the current user
   */
  logout: publicProcedure.mutation(async () => {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }

    return {
      success: true,
    };
  }),

  /**
   * @description Get the current session
   */
  getSession: publicProcedure.query(async ({ ctx }) => {
    return {
      user: ctx.user,
    };
  }),
});
