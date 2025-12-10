export enum StorageKey {
  DOWNLOADED_EBOOK = 'downloaded::ebook',
  REGISTERED_WEBINAR = 'webinar::registered',
  REGISTERED_WAITLIST = 'registered::waitlist',
  REGISTERED_ENQUIRY = 'registered::enquiry',
  BOOKED_CONSULTATION = 'booked::consultation',
  CLICK_ID = 'click::id',
  USER_INFO = 'user::info',
  USER_DISTINCT_ID = 'user::distinct_id',
  ACTIVE_PACKAGE = 'active::package',
}

interface StorageOptions {
  prefix?: string
  expiration?: number // in milliseconds
}

interface StorageItem<T> {
  value: T
  timestamp: number
  expiration?: number
}

class StorageUtil {
  private prefix: string
  private isAvailable: boolean

  constructor(options: StorageOptions = {}) {
    this.prefix = options.prefix || 'hibarr_'
    this.isAvailable = this.checkStorageAvailability()
  }

  private checkStorageAvailability(): boolean {
    if (typeof window === 'undefined') return false

    try {
      const testKey = `${this.prefix}test`
      localStorage.setItem(testKey, 'test')
      localStorage.removeItem(testKey)
      return true
    } catch (error) {
      console.error('Local storage is not available:', error)
      return false
    }
  }

  private getKey(key: StorageKey): string {
    return `${this.prefix}${key}`
  }

  private isExpired(item: StorageItem<unknown>): boolean {
    if (!item.expiration) return false
    return Date.now() - item.timestamp > item.expiration
  }

  set<T>(key: StorageKey, value: T, options: StorageOptions = {}): boolean {
    if (!this.isAvailable) return false

    try {
      const item: StorageItem<T> = {
        value,
        timestamp: Date.now(),
        expiration: options.expiration
      }
      const serialized = JSON.stringify(item)
      localStorage.setItem(this.getKey(key), serialized)
      return true
    } catch (error) {
      console.error(`Error setting storage item ${key}:`, error)
      return false
    }
  }

  get<T>(key: StorageKey): T | null {
    if (!this.isAvailable) return null

    try {
      const serialized = localStorage.getItem(this.getKey(key))
      if (!serialized) return null

      const item: StorageItem<T> = JSON.parse(serialized)

      if (this.isExpired(item)) {
        this.remove(key)
        return null
      }

      return item.value
    } catch (error) {
      console.error(`Error getting storage item ${key}:`, error)
      return null
    }
  }

  remove(key: StorageKey): boolean {
    if (!this.isAvailable) return false

    try {
      localStorage.removeItem(this.getKey(key))
      return true
    } catch (error) {
      console.error(`Error removing storage item ${key}:`, error)
      return false
    }
  }

  clear(): boolean {
    if (!this.isAvailable) return false

    try {
      Object.keys(localStorage)
        .filter(key => key.startsWith(this.prefix))
        .forEach(key => localStorage.removeItem(key))
      return true
    } catch (error) {
      console.error('Error clearing storage:', error)
      return false
    }
  }
}

// Create a singleton instance
const storage = new StorageUtil({ prefix: 'hibarr::' })

export default storage
