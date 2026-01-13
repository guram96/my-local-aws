"use server";

import { sendVerificationEmail } from "../email-verification";

/**
 * Server action to send verification email by user ID
 * This can be called from client components
 * @param userId The ID of the user
 * @param baseUrl Optional base URL for the verification link
 * @returns Object with success status and optional error message
 */
export async function sendVerificationEmailAction(
  userId: number,
  baseUrl?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await sendVerificationEmail(userId, baseUrl);
    return { success: true };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to send verification email";
    console.error("Error sending verification email:", error);
    return { success: false, error: errorMessage };
  }
}

/**
 * Server action to send verification email by email address
 * This can be called from client components
 * @param email The email address of the user
 * @param baseUrl Optional base URL for the verification link
 * @returns Object with success status and optional error message
 */
export async function sendVerificationEmailByEmailAction(
  email: string,
  baseUrl?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await sendVerificationEmail(email, baseUrl);
    return { success: true };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to send verification email";
    console.error("Error sending verification email:", error);
    return { success: false, error: errorMessage };
  }
}
