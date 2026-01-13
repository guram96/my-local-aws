"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth/auth-client";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export function Login() {
  const router = useRouter();
  // Image URL placeholder - replace with your image URL
  const imageUrl =
    "https://d1.awsstatic.com/onedam/marketing-channels/website/aws/en_US/homepage/console-sign-in/devops-agent.52acb83aeee5eb34663006acf52e5d85fdc94c2c.png"; // Add your image URL here

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      // Validate with Zod before submission
      const result = loginSchema.safeParse(value);
      if (!result.success) {
        // Set field errors from Zod validation
        result.error.errors.forEach((error) => {
          const fieldName = error.path[0] as keyof typeof value;
          form.setFieldMeta(fieldName, (prev) => ({
            ...prev,
            errors: [error.message],
          }));
        });
        return;
      }

      // Call Better Auth signIn.email method
      await authClient.signIn.email(
        {
          email: result.data.email,
          password: result.data.password,
          callbackURL: "/console",
        },
        {
          onSuccess: () => {
            router.push("/console");
          },
          onError: (ctx) => {
            console.error("Sign in error:", ctx.error);
            // Set a general form error
            form.setFieldMeta("email", (prev) => ({
              ...prev,
              errors: ["Invalid email or password"],
            }));
            form.setFieldMeta("password", (prev) => ({
              ...prev,
              errors: ["Invalid email or password"],
            }));
          },
        }
      );
    },
  });

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      {/* AWS Logo at top */}
      <div className="pt-8 pb-4 text-center">
        <div className="flex items-center justify-center gap-2">
          <svg
            className="h-10 w-auto"
            viewBox="0 0 120 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* AWS Arrow Logo */}
            <path d="M60 0L73.8034 25.5H46.1966L60 0Z" fill="#FF9900" />
            <path
              d="M46.1966 25.5L60 51L73.8034 25.5H46.1966Z"
              fill="#232F3E"
            />
            <path d="M60 51L46.1966 76.5H73.8034L60 51Z" fill="#FF9900" />
          </svg>
          <span className="text-3xl font-bold text-[#232F3E] tracking-tight">
            AWS
          </span>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="flex min-h-[calc(100vh-120px)]">
        {/* Left Column - Login Form */}
        <div className="flex-1 flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-[400px]">
            {/* Login Card */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                Sign in to your account
              </h1>
              <p className="text-sm text-gray-600 mb-6">
                Enter your email and password
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  form.handleSubmit();
                }}
                className="space-y-5"
              >
                {/* Email Field */}
                <form.Field
                  name="email"
                  validators={{
                    onChange: ({ value }) => {
                      const fieldSchema = loginSchema.shape.email;
                      const result = fieldSchema.safeParse(value);
                      if (!result.success) {
                        return (
                          result.error.errors[0]?.message || "Invalid email"
                        );
                      }
                      return undefined;
                    },
                  }}
                >
                  {(field) => (
                    <div className="space-y-2">
                      <Label
                        htmlFor={field.name}
                        className="text-sm font-medium text-gray-700"
                      >
                        Email
                      </Label>
                      <Input
                        id={field.name}
                        type="email"
                        placeholder="Email"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        required
                        className="h-10 border-gray-300 focus:border-[#FF9900] focus:ring-[#FF9900]"
                      />
                      {field.state.meta.errors &&
                        field.state.meta.errors.length > 0 && (
                          <p className="text-sm text-red-600">
                            {field.state.meta.errors[0]}
                          </p>
                        )}
                    </div>
                  )}
                </form.Field>

                {/* Password Field */}
                <form.Field
                  name="password"
                  validators={{
                    onChange: ({ value }) => {
                      const fieldSchema = loginSchema.shape.password;
                      const result = fieldSchema.safeParse(value);
                      if (!result.success) {
                        return (
                          result.error.errors[0]?.message || "Invalid password"
                        );
                      }
                      return undefined;
                    },
                  }}
                >
                  {(field) => (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor={field.name}
                          className="text-sm font-medium text-gray-700"
                        >
                          Password
                        </Label>
                        <a
                          href="#"
                          className="text-sm text-[#0073BB] hover:text-[#005277] hover:underline"
                          onClick={(e) => {
                            e.preventDefault();
                            // Handle forgot password
                          }}
                        >
                          Forgot password?
                        </a>
                      </div>
                      <Input
                        id={field.name}
                        type="password"
                        placeholder="Password"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        required
                        className="h-10 border-gray-300 focus:border-[#FF9900] focus:ring-[#FF9900]"
                      />
                      {field.state.meta.errors &&
                        field.state.meta.errors.length > 0 && (
                          <p className="text-sm text-red-600">
                            {field.state.meta.errors[0]}
                          </p>
                        )}
                    </div>
                  )}
                </form.Field>

                {/* Sign In Button */}
                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                >
                  {([canSubmit, isSubmitting]) => (
                    <Button
                      type="submit"
                      disabled={!canSubmit || isSubmitting}
                      variant="default"
                      className="w-full h-10 bg-[#FF9900]! hover:bg-[#E68900]! text-white! font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed border-0 shadow-sm"
                    >
                      {isSubmitting ? "Signing in..." : "Sign in"}
                    </Button>
                  )}
                </form.Subscribe>
              </form>

              {/* Footer Links */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-center text-gray-600">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/create-account"
                    className="text-[#0073BB] hover:text-[#005277] hover:underline font-medium"
                  >
                    Create account
                  </Link>
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-xs text-gray-500">
                © 2024, Amazon Web Services, Inc. or its affiliates. All rights
                reserved.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Image/Banner */}
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-green-100 relative overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Promotional banner"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-green-100">
              <div className="text-center p-8">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="w-24 h-24 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-gray-500 text-sm">
                  Image placeholder - Add image URL in login.tsx
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
