import { mysqlTable, serial, text, timestamp, varchar, int, mysqlEnum } from "drizzle-orm/mysql-core";

export const userSystemEnum = mysqlEnum("user_system_enum", ["system", "user"])

export const chats = mysqlTable("chats", {
    id: serial('id').primaryKey(),
    pdfName: text("pdf_name").notNull(),
    pdfUrl: text("pdf_url").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    useId: varchar("user_id", {length: 256}).notNull(),
    fileKey: text("file_key").notNull()
})

export const messages = mysqlTable("messages", {
    id: serial("id").primaryKey(),
    chatId: int("chat_id").notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    role: userSystemEnum.notNull()
})