import "dotenv/config";

import { Resend, type CreateEmailOptions } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type SendEmailOptions = CreateEmailOptions;

export async function sendEmail(options: SendEmailOptions) {
  return resend.emails.send(options);
}
