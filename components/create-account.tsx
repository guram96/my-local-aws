"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import * as React from "react";

export function CreateAccount() {
  const [email, setEmail] = React.useState("");
  const [accountName, setAccountName] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
    // Handle successful signup here
    console.log("Signup attempt:", { email, accountName });
  };

  return (
    <div className="min-h-screen bg-white">
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
            aws
          </span>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="flex min-h-[calc(100vh-120px)] max-w-7xl mx-auto">
        {/* Left Column - Promotional Content */}
        <div className="flex-1 flex items-center justify-center px-8 py-12 border-r border-gray-200">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Try AWS at no cost for up to 6 months
            </h2>
            <p className="text-sm text-gray-600 mb-8">
              Start with USD $100 in AWS credits, plus earn up to USD $100 by
              completing various activities.
            </p>
            {/* Rocket Illustration */}
            <div className="flex justify-center">
              <svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-700"
              >
                {/* Rocket body */}
                <path
                  d="M100 40L110 70H90L100 40Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <rect
                  x="85"
                  y="70"
                  width="30"
                  height="60"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                {/* Rocket fins */}
                <path
                  d="M85 130L75 150L85 150Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M115 130L125 150L115 150Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                {/* Rocket window */}
                <circle
                  cx="100"
                  cy="90"
                  r="8"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                {/* Exhaust flames */}
                <path
                  d="M90 130L85 140L90 140Z"
                  fill="#0073BB"
                  stroke="#0073BB"
                />
                <path
                  d="M100 130L95 145L100 145Z"
                  fill="#0073BB"
                  stroke="#0073BB"
                />
                <path
                  d="M110 130L115 140L110 140Z"
                  fill="#0073BB"
                  stroke="#0073BB"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Right Column - Sign-up Form */}
        <div className="flex-1 flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-semibold text-gray-900 mb-8">
              Sign up for AWS
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Root User Email Address Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Root user email address
                </Label>
                <p className="text-sm text-gray-600">
                  Used for account recovery and as described in the AWS{" "}
                  <a
                    href="#"
                    className="text-[#0073BB] hover:text-[#005277] hover:underline inline-flex items-center gap-1"
                    onClick={(e) => {
                      e.preventDefault();
                      // Handle privacy notice
                    }}
                  >
                    Privacy Notice
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </p>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-10 border-gray-300 focus:border-[#FF9900] focus:ring-[#FF9900]"
                />
              </div>

              {/* AWS Account Name Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="account-name"
                  className="text-sm font-medium text-gray-700"
                >
                  AWS account name
                </Label>
                <p className="text-sm text-gray-600">
                  Choose a name for your account. You can change this name in
                  your account settings after you sign up.
                </p>
                <Input
                  id="account-name"
                  type="text"
                  placeholder="Account name"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  required
                  className="h-10 border-gray-300 focus:border-[#FF9900] focus:ring-[#FF9900]"
                />
              </div>

              {/* Verify Email Address Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-10 bg-[#FF9900] hover:bg-[#E68900] text-white font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed border-0 shadow-sm"
              >
                {isLoading ? "Verifying..." : "Verify email address"}
              </Button>

              {/* OR Separator */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">OR</span>
                </div>
              </div>

              {/* Sign in to existing account Button */}
              <Link href="/" className="block">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-10 border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-md"
                >
                  Sign in to an existing AWS account
                </Button>
              </Link>
            </form>

            {/* Cookie Notice */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-600">
                This site uses essential cookies. See our{" "}
                <a
                  href="#"
                  className="text-[#0073BB] hover:text-[#005277] hover:underline inline-flex items-center gap-1"
                  onClick={(e) => {
                    e.preventDefault();
                    // Handle cookie notice
                  }}
                >
                  Cookie Notice
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>{" "}
                for more information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
