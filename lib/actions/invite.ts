"use server";

import { prisma } from "@/lib/db";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function inviteMemberAction(
  email: string,
  phone: string,
  groupId: string | undefined,
) {
  if (!groupId) throw new Error("Unauthorized");

  await prisma.allowedUser.create({
    data: {
      email: email.toLowerCase(),
      phoneNumber: phone,
      groupId: groupId,
    },
  });

  const baseUrl = process.env.BETTER_AUTH_URL || "http://localhost:3000";
  const inviteLink = `${baseUrl}/register?email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}`;

  // try {
  //   await resend.emails.send({
  //     from: "Power 10 <onboarding@resend.dev>",
  //     to: email,
  //     subject: "You have been invited to join the Vault",
  //     html: `
  //       <div style="font-family: sans-serif; padding: 20px;">
  //         <h2>Welcome to Power 10</h2>
  //         <p>You have been whitelisted for the group management system.</p>
  //         <p>Click the link below to set your password and activate your account:</p>
  //         <a href="${inviteLink}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; margin-top: 10px;">
  //           Activate My Account
  //         </a>
  //         <p style="margin-top: 20px; color: #64748b; font-size: 12px;">
  //           If the button doesn't work, copy this link: ${inviteLink}
  //         </p>
  //       </div>
  //     `,
  //   });
  // } catch (error) {
  //   console.error("Email failed to send:", error);
  // }

  return { success: true, inviteLink };
}
