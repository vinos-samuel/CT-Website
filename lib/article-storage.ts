import { PersistentStorage } from "./persistent-storage"

// Legacy interface for backward compatibility
export interface StoredArticle {
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
}

// Wrapper class that uses PersistentStorage
export class ArticleStorage {
  static getArticles(): StoredArticle[] {
    return PersistentStorage.getArticles()
  }

  static saveArticle(article: Omit<StoredArticle, "id" | "createdAt" | "updatedAt">): StoredArticle {
    return PersistentStorage.saveArticle(article)
  }

  static updateArticle(id: string, updates: Partial<StoredArticle>): StoredArticle | null {
    return PersistentStorage.updateArticle(id, updates)
  }

  static deleteArticle(id: string): boolean {
    return PersistentStorage.deleteArticle(id)
  }

  static getArticlesByCategory(category: string): StoredArticle[] {
    return PersistentStorage.getArticles().filter(
      (article) => article.category === category && article.status === "published",
    )
  }

  static exportArticles(): string {
    return PersistentStorage.exportArticles()
  }

  static importArticles(jsonData: string): boolean {
    return PersistentStorage.importArticles(jsonData)
  }

  // Debug info
  static getStorageInfo(): any {
    return PersistentStorage.getStorageInfo()
  }
}
