import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create HTTP server
  const httpServer = createServer(app);
  
  // API routes
  const apiPrefix = "/api";
  
  // Categories routes
  app.get(`${apiPrefix}/categories`, async (req, res) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });
  
  app.get(`${apiPrefix}/categories/:slug`, async (req, res) => {
    try {
      const category = await storage.getCategoryBySlug(req.params.slug);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });
  
  // Products routes
  app.get(`${apiPrefix}/products`, async (req, res) => {
    try {
      const { category, featured, new: isNew, sale, search } = req.query;
      
      let products;
      
      if (category) {
        const categoryObj = await storage.getCategoryBySlug(category as string);
        if (!categoryObj) {
          return res.status(404).json({ message: "Category not found" });
        }
        products = await storage.getProductsByCategory(categoryObj.id);
      } else if (featured === 'true') {
        products = await storage.getFeaturedProducts();
      } else if (isNew === 'true') {
        products = await storage.getNewArrivals();
      } else if (sale === 'true') {
        products = await storage.getSaleProducts();
      } else if (search) {
        products = await storage.searchProducts(search as string);
      } else {
        products = await storage.getAllProducts();
      }
      
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });
  
  app.get(`${apiPrefix}/products/:slug`, async (req, res) => {
    try {
      const product = await storage.getProductBySlug(req.params.slug);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });
  
  // Reviews routes
  app.get(`${apiPrefix}/products/:id/reviews`, async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      if (isNaN(productId)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      
      const reviews = await storage.getReviewsByProduct(productId);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });
  
  app.post(`${apiPrefix}/reviews`, async (req, res) => {
    try {
      const review = await storage.createReview(req.body);
      res.status(201).json(review);
    } catch (error) {
      res.status(500).json({ message: "Failed to create review" });
    }
  });
  
  // Testimonials routes
  app.get(`${apiPrefix}/testimonials`, async (req, res) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });
  
  return httpServer;
}
