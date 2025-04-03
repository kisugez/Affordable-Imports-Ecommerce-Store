import { pgTable, text, serial, integer, boolean, numeric, timestamp, foreignKey } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Categories
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  image: text("image"),
  gradientFrom: text("gradient_from"),
  gradientTo: text("gradient_to"),
});

export const insertCategorySchema = createInsertSchema(categories).pick({
  name: true,
  slug: true,
  description: true,
  image: true,
  gradientFrom: true,
  gradientTo: true,
});

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

// Define category relations
export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

// Products
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: numeric("original_price", { precision: 10, scale: 2 }),
  image: text("image").notNull(),
  categoryId: integer("category_id").references(() => categories.id),
  featured: boolean("featured").default(false),
  isNew: boolean("is_new").default(false),
  isSale: boolean("is_sale").default(false),
  rating: numeric("rating", { precision: 3, scale: 1 }).default("0"),
  reviewCount: integer("review_count").default(0),
  stock: integer("stock").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertProductSchema = createInsertSchema(products).pick({
  name: true,
  slug: true,
  description: true,
  price: true,
  originalPrice: true,
  image: true,
  categoryId: true,
  featured: true,
  isNew: true,
  isSale: true,
  rating: true,
  reviewCount: true,
  stock: true,
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

// Define product relations
export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  reviews: many(reviews),
}));

// Reviews
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").references(() => products.id),
  customerName: text("customer_name").notNull(),
  location: text("location"),
  avatar: text("avatar"),
  rating: integer("rating").notNull(),
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertReviewSchema = createInsertSchema(reviews).pick({
  productId: true,
  customerName: true,
  location: true,
  avatar: true,
  rating: true,
  comment: true,
});

export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviews.$inferSelect;

// Define review relations
export const reviewsRelations = relations(reviews, ({ one }) => ({
  product: one(products, {
    fields: [reviews.productId],
    references: [products.id],
  }),
}));

// Testimonials
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  location: text("location"),
  avatar: text("avatar"),
  rating: integer("rating").notNull(),
  comment: text("comment").notNull(),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).pick({
  customerName: true,
  location: true,
  avatar: true,
  rating: true,
  comment: true,
});

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;
