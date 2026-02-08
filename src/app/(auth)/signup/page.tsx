"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { useSignUp } from "@/hooks/use-auth";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpInput } from "@/lib/validations/auth";
import { GoogleLogoIcon } from "@phosphor-icons/react";
import DismissibleAlert from "@/components/shadcn-studio/alert/alert-10";
import { Spinner } from "@/components/ui/spinner";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: signup, isPending, isSuccess, isError, error } = useSignUp();

  const form = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // reset form when success
  useEffect(() => {
    if (isSuccess) {
      form.reset();
    }
  }, [isSuccess, form]);

  const onSubmit = (data: SignUpInput) => {
    signup(data);
  };

  return (
    <Fragment>
      <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Sign up</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter your information below to create your account
            </p>
          </div>
          {isError && (
            <DismissibleAlert
              title="Error"
              description={error.message}
              variant="error"
            />
          )}
          {isSuccess && (
            <DismissibleAlert
              title="Success"
              description="We have sent a confirmation link to your inbox. Check your email to complete the sign-up."
              variant="success"
            />
          )}
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="email"
                  placeholder="m@example.com"
                  aria-invalid={fieldState.invalid}
                  required
                />
                <FieldDescription>
                  We&apos;ll use this to send confirmation. We will not share
                  your email with anyone else.
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Field>
            <Field className="grid grid-cols-2 gap-4">
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        id={field.name}
                        type={showPassword ? "text" : "password"}
                        aria-invalid={fieldState.invalid}
                        required
                      />
                      <Button
                        className="hover:text-foreground absolute top-0 right-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        size="icon"
                        type="button"
                        variant="ghost"
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="text-muted-foreground h-4 w-4" />
                        ) : (
                          <EyeIcon className="text-muted-foreground h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Confirm Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="password"
                      aria-invalid={fieldState.invalid}
                      required
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </Field>
          </Field>
          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending && <Spinner data-icon="inline-start" />}
              Create Account
            </Button>
          </Field>
          <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
            Or continue with
          </FieldSeparator>
          <Field className="grid grid-cols-1 gap-4">
            <Button variant="outline" type="button">
              <GoogleLogoIcon size={24} weight="bold" />
              <span className="sr-only text-xs">Sign up with Google</span>
            </Button>
          </Field>
          <FieldDescription className="text-center">
            Already have an account? <Link href="/login">Sign in</Link>
          </FieldDescription>
        </FieldGroup>
      </form>
      <div className="bg-muted relative hidden md:block">
        <div className="absolute inset-0 h-full w-full dark:brightness-[0.2] dark:grayscale">
          <Image
            src="/auth.png"
            alt="Image"
            fill
            className="object-cover object-center"
          />
        </div>
      </div>
    </Fragment>
  );
}
