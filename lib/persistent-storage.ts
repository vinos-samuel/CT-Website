// Enhanced storage system that survives code updates
export interface PersistentArticle {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  category: string
  status: "draft" | "published"
  createdAt: string
  updatedAt: string
  author: string
  version: number // Track article versions
}

export class PersistentStorage {
  private static MAIN_KEY = "cthub_persistent_articles"
  private static BACKUP_KEYS = ["cthub_articles_backup_1", "cthub_articles_backup_2", "cthub_articles_backup_3"]
  private static VERSION_KEY = "cthub_storage_version"
  private static CURRENT_VERSION = "2.0"

  // Initialize storage with version checking
  static initialize(): void {
    const currentVersion = localStorage.getItem(this.VERSION_KEY)

    if (currentVersion !== this.CURRENT_VERSION) {
      console.log("Storage version updated, preserving existing articles")
      this.migrateExistingData()
      localStorage.setItem(this.VERSION_KEY, this.CURRENT_VERSION)
    }
  }

  // Migrate data from old storage systems
  private static migrateExistingData(): void {
    const oldKeys = ["cthub_articles_v2", "cthub_articles_backup", "cthub_articles"]

    let existingArticles: PersistentArticle[] = []

    // Try to find articles from any previous storage
    for (const key of oldKeys) {
      try {
        const stored = localStorage.getItem(key)
        if (stored) {
          const articles = JSON.parse(stored)
          if (Array.isArray(articles) && articles.length > 0) {
            console.log(`Found ${articles.length} articles in ${key}`)
            existingArticles = articles.map(this.normalizeArticle)
            break
          }
        }
      } catch (error) {
        console.warn(`Error reading from ${key}:`, error)
      }
    }

    // If we found existing articles, preserve them
    if (existingArticles.length > 0) {
      this.saveArticles(existingArticles)
      console.log(`Migrated ${existingArticles.length} articles to new storage`)
    } else {
      // Initialize with sample data only if no articles exist
      this.initializeWithSamples()
    }
  }

  // Normalize article format
  private static normalizeArticle(article: any): PersistentArticle {
    return {
      id: article.id || `migrated-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: article.title || "Untitled Article",
      slug: article.slug || this.generateSlug(article.title || "untitled"),
      content: article.content || "",
      excerpt: article.excerpt,
      category: article.category || "risk-management",
      status: article.status || "published",
      createdAt: article.createdAt || new Date().toISOString(),
      updatedAt: article.updatedAt || new Date().toISOString(),
      author: article.author || "Admin",
      version: 1,
    }
  }

  // Save articles with multiple backups
  private static saveArticles(articles: PersistentArticle[]): void {
    const dataToStore = JSON.stringify(articles, null, 2)

    try {
      // Save to main storage
      localStorage.setItem(this.MAIN_KEY, dataToStore)

      // Save to multiple backup locations
      this.BACKUP_KEYS.forEach((key, index) => {
        try {
          localStorage.setItem(key, dataToStore)
        } catch (error) {
          console.warn(`Failed to save backup ${index + 1}:`, error)
        }
      })

      // Also save to sessionStorage
      sessionStorage.setItem(this.MAIN_KEY, dataToStore)

      console.log(`✅ Saved ${articles.length} articles with ${this.BACKUP_KEYS.length} backups`)
    } catch (error) {
      console.error("Failed to save articles:", error)
    }
  }

  // Load articles with fallback chain
  static loadArticles(): PersistentArticle[] {
    this.initialize()

    const storageKeys = [this.MAIN_KEY, ...this.BACKUP_KEYS]

    for (const key of storageKeys) {
      try {
        const stored = localStorage.getItem(key)
        if (stored) {
          const articles = JSON.parse(stored)
          if (Array.isArray(articles) && articles.length > 0) {
            console.log(`✅ Loaded ${articles.length} articles from ${key}`)

            // If we loaded from backup, restore to main storage
            if (key !== this.MAIN_KEY) {
              this.saveArticles(articles)
              console.log("🔄 Restored articles to main storage")
            }

            return articles
          }
        }
      } catch (error) {
        console.warn(`Failed to load from ${key}:`, error)
      }
    }

    // Try sessionStorage as last resort
    try {
      const stored = sessionStorage.getItem(this.MAIN_KEY)
      if (stored) {
        const articles = JSON.parse(stored)
        if (Array.isArray(articles)) {
          console.log("🔄 Recovered articles from session storage")
          this.saveArticles(articles)
          return articles
        }
      }
    } catch (error) {
      console.warn("Failed to load from session storage:", error)
    }

    // If nothing found, initialize with samples
    console.log("🆕 No articles found, initializing with samples")
    return this.initializeWithSamples()
  }

  // Initialize with sample articles
  private static initializeWithSamples(): PersistentArticle[] {
    const sampleArticles: PersistentArticle[] = [
      {
        id: "persistent-sample-1",
        title: "Understanding Worker Classification",
        slug: "understanding-worker-classification",
        content: `<h2>Introduction to Worker Classification</h2>
        <p>Proper worker classification is crucial for compliance and risk management. This article covers the key differences between employees and independent contractors.</p>
        
        <h3>Key Classification Factors</h3>
        <ul>
          <li><strong>Control:</strong> How much control does the company have over the worker?</li>
          <li><strong>Financial:</strong> Who provides tools, equipment, and bears financial risk?</li>
          <li><strong>Relationship:</strong> Is this an ongoing relationship or project-based?</li>
        </ul>
        
        <p>Understanding these factors helps ensure proper classification and reduces legal risks.</p>`,
        excerpt: "Learn the key factors for properly classifying workers as employees vs independent contractors.",
        category: "worker-classification",
        status: "published",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        author: "Admin",
        version: 1,
      },
      {
        id: "persistent-sample-2",
        title: "Risk Management Best Practices",
        slug: "risk-management-best-practices",
        content: `<h2>Managing Contingent Workforce Risks</h2>
        <p>Effective risk management is essential when working with contingent workers. Here are the key areas to focus on:</p>
        
        <h3>Common Risk Areas</h3>
        <ol>
          <li><strong>Compliance Risks:</strong> Misclassification, tax obligations</li>
          <li><strong>Security Risks:</strong> Data access, confidentiality</li>
          <li><strong>Quality Risks:</strong> Performance standards, deliverables</li>
          <li><strong>Legal Risks:</strong> Contract terms, liability</li>
        </ol>
        
        <p><span style="color: red;">Important:</span> Regular audits and clear policies help mitigate these risks.</p>`,
        excerpt: "Essential strategies for managing risks when working with contingent workers.",
        category: "risk-management",
        status: "published",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        author: "Admin",
        version: 1,
      },
    ]

    this.saveArticles(sampleArticles)
    return sampleArticles
  }

  // Public API methods
  static getArticles(): PersistentArticle[] {
    return this.loadArticles()
  }

  static saveArticle(
    article: Omit<PersistentArticle, "id" | "createdAt" | "updatedAt" | "version">,
  ): PersistentArticle {
    const articles = this.getArticles()
    const now = new Date().toISOString()

    const newArticle: PersistentArticle = {
      ...article,
      id: `persistent-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: now,
      updatedAt: now,
      slug: this.generateSlug(article.title),
      version: 1,
    }

    articles.push(newArticle)
    this.saveArticles(articles)

    return newArticle
  }

  static updateArticle(id: string, updates: Partial<PersistentArticle>): PersistentArticle | null {
    const articles = this.getArticles()
    const index = articles.findIndex((a) => a.id === id)

    if (index === -1) return null

    articles[index] = {
      ...articles[index],
      ...updates,
      updatedAt: new Date().toISOString(),
      version: (articles[index].version || 1) + 1,
    }

    this.saveArticles(articles)
    return articles[index]
  }

  static deleteArticle(id: string): boolean {
    const articles = this.getArticles()
    const filtered = articles.filter((a) => a.id !== id)

    if (filtered.length === articles.length) return false

    this.saveArticles(filtered)
    return true
  }

  static exportArticles(): string {
    const articles = this.getArticles()
    return JSON.stringify(
      {
        version: this.CURRENT_VERSION,
        exportDate: new Date().toISOString(),
        articles: articles,
      },
      null,
      2,
    )
  }

  static importArticles(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData)
      let articles: PersistentArticle[]

      if (data.articles && Array.isArray(data.articles)) {
        // New format with metadata
        articles = data.articles.map(this.normalizeArticle)
      } else if (Array.isArray(data)) {
        // Old format - direct array
        articles = data.map(this.normalizeArticle)
      } else {
        throw new Error("Invalid format")
      }

      this.saveArticles(articles)
      console.log(`✅ Imported ${articles.length} articles`)
      return true
    } catch (error) {
      console.error("Import failed:", error)
      return false
    }
  }

  private static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-")
      .trim()
  }

  // Debug methods
  static getStorageInfo(): any {
    return {
      version: localStorage.getItem(this.VERSION_KEY),
      mainStorage: !!localStorage.getItem(this.MAIN_KEY),
      backups: this.BACKUP_KEYS.map((key) => !!localStorage.getItem(key)),
      articleCount: this.getArticles().length,
    }
  }

  static clearAllStorage(): void {
    ;[this.MAIN_KEY, ...this.BACKUP_KEYS, this.VERSION_KEY].forEach((key) => {
      localStorage.removeItem(key)
    })
    sessionStorage.removeItem(this.MAIN_KEY)
    console.log("🗑️ Cleared all storage")
  }
}
