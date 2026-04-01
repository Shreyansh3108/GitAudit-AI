import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import {prisma} from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> Choose the webhook
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }

  // Get the headers from the request
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no Svix headers, it's a fake request. Block it.
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse('Error occured -- no svix headers', {
      status: 400
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new NextResponse('Error occured', {
      status: 400
    });
  }

  // Handle the 'user.created' event
  const eventType = evt.type;

  if (eventType === 'user.created') {
    const { id, email_addresses } = evt.data;

    if (!id || !email_addresses) {
      return new NextResponse('Error occurred -- missing data', { status: 400 });
    }

    const primaryEmail = email_addresses[0].email_address;

    try {
      // 🌟 MAGIC HAPPENS HERE: Save the user to MongoDB!
      // Because of your Prisma schema, 'tier' defaults to 'Free' and 'credits' defaults to 15!
      await prisma.user.create({
        data: {
          clerkUserId: id,
          email: primaryEmail,
        }
      });

      console.log(`✅ Successfully created user in MongoDB: ${primaryEmail}`);
      return NextResponse.json({ message: 'User created successfully' }, { status: 200 });

    } catch (error) {
      console.error('❌ Error saving user to database:', error);
      return new NextResponse('Error saving user to database', { status: 500 });
    }
  }

  // Return a 200 for any other event types we aren't explicitly handling
  return new NextResponse('', { status: 200 });
}