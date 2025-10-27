import { Injectable } from '@nestjs/common';

export interface UrlMapping {
  shortCode: string;
  originalUrl: string;
  createdAt: Date;
}

@Injectable()
export class ShortenerService {
  private urlMappings: Map<string, UrlMapping> = new Map();
  private reverseMapping: Map<string, string> = new Map();

  generateShortUrl(originalUrl: string, baseUrl: string = 'http://localhost:3000'): string {
    // Check if URL is already shortened
    const existingShortCode = this.reverseMapping.get(originalUrl);
    if (existingShortCode) {
      return `${baseUrl}/s/${existingShortCode}`;
    }

    // Generate a random short code
    const shortCode = this.generateShortCode();

    const mapping: UrlMapping = {
      shortCode,
      originalUrl,
      createdAt: new Date()
    };

    this.urlMappings.set(shortCode, mapping);
    this.reverseMapping.set(originalUrl, shortCode);

    return `${baseUrl}/s/${shortCode}`;
  }

  getOriginalUrl(shortCode: string): string | null {
    const mapping = this.urlMappings.get(shortCode);
    return mapping ? mapping.originalUrl : null;
  }

  getAllMappings(): UrlMapping[] {
    return Array.from(this.urlMappings.values());
  }

  private generateShortCode(length: number = 6): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    do {
      result = '';
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
    } while (this.urlMappings.has(result));

    return result;
  }
}