// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { 
  pgSchema, 
  pgTable, 
  uuid, 
  varchar, 
  text, 
  timestamp, 
  pgEnum 
} from "drizzle-orm/pg-core";

export const authSchema = pgSchema("auth");

export const authUsers =  authSchema.table("users", {
  id: uuid("id").primaryKey(),
});

// use to point the supabase auth user to the database for cascade delete
export const profiles = pgTable("profiles", {
  id: uuid("id")
    .primaryKey()
    .references(() =>authUsers.id, {onDelete: "cascade"}),
  displayName: varchar("display_name"),
  avatarUrl: text("avatar_url"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const jobStatusEnum = pgEnum("job_status", [
  "APPLYING",
  "APPLIED",
  "FOR_INTERVIEW",
  "INTERVIEWING",
  "OFFER",
  "REJECTED",
  "NO_RESPONSE",
  "WITHDRAW",
  "HIRED",
  "NEGOTIATING",
  "ON_HOLD"
]);

export const jobs = pgTable("jobs", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references( ()=> profiles.id, {onDelete: "cascade"}),
  company: varchar("company").notNull(),
  position: varchar("position").notNull(),
  status: jobStatusEnum("status").default("APPLYING").notNull(),
  url: text("url"),
  salary: varchar("salary"),
  jobDescription: text("job_description"),
  note: text("note"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})



