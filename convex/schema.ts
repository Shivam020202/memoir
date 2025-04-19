import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  tasks: defineTable({
    title: v.string(),
    description: v.string(),
    date: v.string(), // ISO date string
    time: v.optional(v.string()), // Optional specific time
    completed: v.boolean(),
    userId: v.id("users"),
    notified: v.boolean(),
  }).index("by_user_and_date", ["userId", "date"]),
  
  notifications: defineTable({
    taskId: v.id("tasks"),
    userId: v.id("users"),
    scheduledTime: v.string(), // ISO datetime string
    sent: v.boolean(),
  }).index("by_scheduled_time", ["scheduledTime"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
