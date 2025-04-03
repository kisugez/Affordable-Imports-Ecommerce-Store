import { 
  users, type User, type InsertUser,
  categories, type Category, type InsertCategory,
  products, type Product, type InsertProduct,
  reviews, type Review, type InsertReview,
  testimonials, type Testimonial, type InsertTestimonial
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Categories
  getAllCategories(): Promise<Category[]>;
  getCategoryById(id: number): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Products
  getAllProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getProductsByCategory(categoryId: number): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  getNewArrivals(): Promise<Product[]>;
  getSaleProducts(): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Reviews
  getReviewsByProduct(productId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  
  // Testimonials
  getAllTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private products: Map<number, Product>;
  private reviews: Map<number, Review>;
  private testimonials: Map<number, Testimonial>;
  private userCurrentId: number;
  private categoryCurrentId: number;
  private productCurrentId: number;
  private reviewCurrentId: number;
  private testimonialCurrentId: number;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.products = new Map();
    this.reviews = new Map();
    this.testimonials = new Map();
    this.userCurrentId = 1;
    this.categoryCurrentId = 1;
    this.productCurrentId = 1;
    this.reviewCurrentId = 1;
    this.testimonialCurrentId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Category methods
  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }
  
  async getCategoryById(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }
  
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug,
    );
  }
  
  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.categoryCurrentId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }
  
  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(
      (product) => product.slug === slug,
    );
  }
  
  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.categoryId === categoryId,
    );
  }
  
  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.featured === true,
    );
  }
  
  async getNewArrivals(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.isNew === true,
    );
  }
  
  async getSaleProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.isSale === true,
    );
  }
  
  async searchProducts(query: string): Promise<Product[]> {
    const lowerCaseQuery = query.toLowerCase();
    return Array.from(this.products.values()).filter(
      (product) => 
        product.name.toLowerCase().includes(lowerCaseQuery) ||
        (product.description && product.description.toLowerCase().includes(lowerCaseQuery))
    );
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productCurrentId++;
    const now = new Date();
    const product: Product = { 
      ...insertProduct, 
      id,
      createdAt: now
    };
    this.products.set(id, product);
    return product;
  }
  
  // Review methods
  async getReviewsByProduct(productId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(
      (review) => review.productId === productId,
    );
  }
  
  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.reviewCurrentId++;
    const now = new Date();
    const review: Review = { 
      ...insertReview, 
      id,
      createdAt: now
    };
    this.reviews.set(id, review);
    
    // Update product rating
    const product = await this.getProductById(insertReview.productId);
    if (product) {
      const reviews = await this.getReviewsByProduct(product.id);
      const newReviewCount = reviews.length + 1;
      const totalRating = reviews.reduce((sum, review) => sum + Number(review.rating), 0) + Number(insertReview.rating);
      const newRating = totalRating / newReviewCount;
      
      this.products.set(product.id, {
        ...product,
        rating: String(newRating.toFixed(1)),
        reviewCount: newReviewCount
      });
    }
    
    return review;
  }
  
  // Testimonial methods
  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }
  
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.testimonialCurrentId++;
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
  
  // Initialize sample data
  private initializeData() {
    // Categories
    const categories: InsertCategory[] = [
      {
        name: "Electronics",
        slug: "electronics",
        description: "Latest electronic gadgets and accessories",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        gradientFrom: "from-primary",
        gradientTo: "to-red-700"
      },
      {
        name: "Home & Kitchen",
        slug: "home-kitchen",
        description: "Quality home and kitchen appliances",
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        gradientFrom: "from-blue-600",
        gradientTo: "to-blue-800"
      },
      {
        name: "Fashion",
        slug: "fashion",
        description: "Trendy fashion items and accessories",
        image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        gradientFrom: "from-purple-600",
        gradientTo: "to-purple-800"
      },
      {
        name: "Beauty & Personal Care",
        slug: "beauty-personal-care",
        description: "High-quality beauty and personal care products",
        image: "https://images.unsplash.com/photo-1571371293919-4c74f59b0613?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        gradientFrom: "from-green-600",
        gradientTo: "to-green-800"
      }
    ];
    
    categories.forEach(category => {
      this.createCategory(category);
    });
    
    // Products
    const products: InsertProduct[] = [
      {
        name: "Premium Headphones",
        slug: "premium-headphones",
        description: "High-quality over-ear headphones with noise cancellation",
        price: "6999",
        originalPrice: "8500",
        image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        categoryId: 1,
        featured: true,
        isNew: false,
        isSale: true,
        rating: "4.5",
        reviewCount: 24,
        stock: 15
      },
      {
        name: "Smart Watch",
        slug: "smart-watch",
        description: "Latest smart watch with health tracking features",
        price: "12500",
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        categoryId: 1,
        featured: true,
        isNew: false,
        isSale: false,
        rating: "5.0",
        reviewCount: 42,
        stock: 28
      },
      {
        name: "Bluetooth Speaker",
        slug: "bluetooth-speaker",
        description: "Portable Bluetooth speaker with rich sound quality",
        price: "4299",
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        categoryId: 1,
        featured: true,
        isNew: true,
        isSale: false,
        rating: "4.0",
        reviewCount: 18,
        stock: 35
      },
      {
        name: "Laptop Bag",
        slug: "laptop-bag",
        description: "Stylish and durable laptop bag with multiple compartments",
        price: "2850",
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        categoryId: 3,
        featured: true,
        isNew: false,
        isSale: false,
        rating: "3.5",
        reviewCount: 7,
        stock: 42
      },
      {
        name: "Wireless Earbuds",
        slug: "wireless-earbuds",
        description: "High-quality wireless earbuds with noise cancellation",
        price: "3499",
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        categoryId: 1,
        featured: false,
        isNew: true,
        isSale: false,
        rating: "4.5",
        reviewCount: 15,
        stock: 20
      },
      {
        name: "Smart Home Security Camera",
        slug: "smart-home-security-camera",
        description: "Advanced security camera with motion detection",
        price: "7899",
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        categoryId: 2,
        featured: false,
        isNew: true,
        isSale: false,
        rating: "4.0",
        reviewCount: 8,
        stock: 12
      },
      {
        name: "Imported Sneakers",
        slug: "imported-sneakers",
        description: "Comfortable and stylish imported sneakers",
        price: "5200",
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        categoryId: 3,
        featured: false,
        isNew: true,
        isSale: false,
        rating: "5.0",
        reviewCount: 32,
        stock: 18
      },
      {
        name: "Polaroid Camera",
        slug: "polaroid-camera",
        description: "Classic polaroid camera for instant photography",
        price: "9750",
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        categoryId: 1,
        featured: false,
        isNew: true,
        isSale: false,
        rating: "3.0",
        reviewCount: 5,
        stock: 10
      }
    ];
    
    products.forEach(product => {
      this.createProduct(product);
    });
    
    // Testimonials
    const testimonials: InsertTestimonial[] = [
      {
        customerName: "Sarah Kamau",
        location: "Nairobi",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        rating: 5,
        comment: "I ordered a smart watch and it arrived within 3 days. The quality is exceptional and the price was much better than other retailers. Will definitely shop here again!"
      },
      {
        customerName: "James Omondi",
        location: "Mombasa",
        avatar: "https://randomuser.me/api/portraits/men/54.jpg",
        rating: 4,
        comment: "Great selection of products. I particularly love the kitchen appliances section. The delivery was prompt and the customer service team was very helpful when I had questions."
      },
      {
        customerName: "Elizabeth Wanjiku",
        location: "Kisumu",
        avatar: "https://randomuser.me/api/portraits/women/67.jpg",
        rating: 5,
        comment: "I've been shopping here for over a year now. Their products are genuine and affordable. The new arrivals section always has the latest gadgets before they hit the local stores!"
      }
    ];
    
    testimonials.forEach(testimonial => {
      this.createTestimonial(testimonial);
    });
  }
}

export const storage = new MemStorage();
