import express, { type Request, type Response } from "express";
import { Webhook } from "svix";
import db from "../../../../../config/db";

const router = express.Router();

router.post("/webhook", express.raw({ type: "application/json" }), async (req: Request, res: Response) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

    if (!webhookSecret) {
      res.status(500).json({ error: "Missing CLERK_WEBHOOK_SECRET" });
      return;
    }

    const svixId = req.header("svix-id");
    const svixTimestamp = req.header("svix-timestamp");
    const svixSignature = req.header("svix-signature");

    if (!svixId || !svixTimestamp || !svixSignature) {
      res.status(400).json({ error: "Missing Svix headers" });
      return;
    }

    let event: {
      type: string;
      data: {
        username?: string | null;
        first_name?: string | null;
        last_name?: string | null;
        email_addresses?: Array<{ email_address: string }>;
      };
    };

    try {
      const wh = new Webhook(webhookSecret);
      event = wh.verify(req.body.toString("utf8"), {
        "svix-id": svixId,
        "svix-timestamp": svixTimestamp,
        "svix-signature": svixSignature,
      }) as typeof event;
    } catch (_error) {
      res.status(400).json({ error: "Invalid webhook signature" });
      return;
    }

    if (event.type !== "user.created" && event.type !== "user.updated") {
      res.status(200).json({ received: true, ignored: true });
      return;
    }

    const primaryEmail = event.data.email_addresses?.[0]?.email_address;
    const username = event.data.username;
    const firstName = event.data.first_name ?? "";
    const lastName = event.data.last_name ?? "";
    const fallbackName = `${firstName} ${lastName}`.trim();
    const name = username || fallbackName || "clerk-user";

    if (!primaryEmail) {
      res.status(400).json({ error: "No email in Clerk payload" });
      return;
    }

    try {
      await db.none(
        `
        INSERT INTO users (name, email)
        VALUES ($1, $2)
        ON CONFLICT (email)
        DO UPDATE SET name = EXCLUDED.name
      `,
        [name, primaryEmail],
      );
      res.header("access-control-allow-origin", "*");

      res.status(200).json({ received: true });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown database error";
      res.status(500).json({ error: "Failed to sync user", detail: message });
    }
  },
);

export default router;
