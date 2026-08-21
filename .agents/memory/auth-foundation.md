---
name: Authentication foundation
description: Durable authentication decisions for the Dubai Extraordinary product
---

Clerk is the shared identity layer for the Expo mobile app and Express API. Mobile requests use bearer tokens; the API resolves identity through Clerk middleware, while public discovery remains accessible without signing in.

**Why:** The product spans personal collections, bookings, enquiries, business dashboards, and admin moderation, so one managed identity system must support both consumer and role-aware workflows.

**How to apply:** Keep public catalog routes unauthenticated. Protect user-owned data and business/admin actions at the API boundary using the Clerk request identity, not client-provided user IDs.