import crypto from 'crypto';
import { initializeDatabase } from './db';
import { User } from '../entities/User';
import { sendMail } from './email';

/**
 * Generate a secure random token for email verification
 * @returns A random hex string token
 */
function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Create a verification URL
 * @param token The verification token
 * @param baseUrl The base URL of the application
 * @returns The full verification URL
 */
function createVerificationUrl(token: string, baseUrl?: string): string {
  const base = baseUrl || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  return `${base}/verify-email?token=${token}`;
}

/**
 * Create HTML email template for verification email
 * @param verificationUrl The verification URL
 * @param userName Optional user name
 * @returns HTML string
 */
function createVerificationEmailTemplate(
  verificationUrl: string,
  userName?: string
): string {
  const name = userName || 'there';
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f8f9fa; padding: 30px; border-radius: 8px;">
          <h1 style="color: #232F3E; margin-top: 0;">Verify Your Email Address</h1>
          
          <p>Hi ${name},</p>
          
          <p>Thank you for signing up! Please verify your email address by clicking the button below:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background-color: #FF9900; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
              Verify Email Address
            </a>
          </div>
          
          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #0073BB;">
            <a href="${verificationUrl}" style="color: #0073BB;">${verificationUrl}</a>
          </p>
          
          <p style="margin-top: 30px; font-size: 12px; color: #666;">
            This link will expire in 24 hours. If you didn't create an account, you can safely ignore this email.
          </p>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          
          <p style="font-size: 12px; color: #666; margin: 0;">
            © ${new Date().getFullYear()} AWS. All rights reserved.
          </p>
        </div>
      </body>
    </html>
  `;
}

/**
 * Create plain text email template for verification email
 * @param verificationUrl The verification URL
 * @param userName Optional user name
 * @returns Plain text string
 */
function createVerificationEmailText(
  verificationUrl: string,
  userName?: string
): string {
  const name = userName || 'there';
  return `
Hi ${name},

Thank you for signing up! Please verify your email address by visiting the following link:

${verificationUrl}

This link will expire in 24 hours. If you didn't create an account, you can safely ignore this email.

© ${new Date().getFullYear()} AWS. All rights reserved.
  `.trim();
}

/**
 * Send email verification email to a user
 * @param userId The ID of the user to send verification email to
 * @param baseUrl Optional base URL for the verification link (defaults to env variable or localhost)
 * @returns Promise that resolves when email is sent
 * @throws Error if user not found or email sending fails
 */
export async function sendVerificationEmail(
  userId: number,
  baseUrl?: string
): Promise<void> {
  // Ensure database is initialized
  const dataSource = await initializeDatabase();
  const userRepository = dataSource.getRepository(User);

  // Find the user
  const user = await userRepository.findOne({ where: { id: userId } });

  if (!user) {
    throw new Error('User not found');
  }

  if (user.emailVerified) {
    throw new Error('Email is already verified');
  }

  // Generate verification token
  const token = generateVerificationToken();
  const tokenExpiry = new Date();
  tokenExpiry.setHours(tokenExpiry.getHours() + 24); // Token expires in 24 hours

  // Save token to user
  user.verificationToken = token;
  user.verificationTokenExpiry = tokenExpiry;
  await userRepository.save(user);

  // Create verification URL
  const verificationUrl = createVerificationUrl(token, baseUrl);

  // Prepare user name
  const userName = user.firstName
    ? `${user.firstName}${user.lastName ? ` ${user.lastName}` : ''}`
    : undefined;

  // Send verification email
  await sendMail({
    to: user.email,
    subject: 'Verify Your Email Address',
    html: createVerificationEmailTemplate(verificationUrl, userName),
    text: createVerificationEmailText(verificationUrl, userName),
  });
}

/**
 * Send email verification email by email address
 * @param email The email address of the user
 * @param baseUrl Optional base URL for the verification link
 * @returns Promise that resolves when email is sent
 * @throws Error if user not found or email sending fails
 */
export async function sendVerificationEmailByEmail(
  email: string,
  baseUrl?: string
): Promise<void> {
  // Ensure database is initialized
  const dataSource = await initializeDatabase();
  const userRepository = dataSource.getRepository(User);

  // Find the user by email
  const user = await userRepository.findOne({ where: { email } });

  if (!user) {
    throw new Error('User not found');
  }

  await sendVerificationEmail(user.id, baseUrl);
}
