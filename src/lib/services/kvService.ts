import { env } from '$env/dynamic/private';

interface KVResponse {
  success: boolean;
  result: string | null;
  errors: any[];
}

export class KVService {
  private static readonly BASE_URL = 'https://api.cloudflare.com/client/v4';
  private static readonly ACCOUNT_ID = 'c6f1381f5ef948330ede87ce8dba5714';
  private static readonly NAMESPACE_ID = '9016759b583a4d6e89c8d210ca45dd0b';

  private static getHeaders(): HeadersInit {
    return {
      'Authorization': `Bearer ${env.CLOUDFLARE_API_TOKEN}`,
      'Content-Type': 'application/json'
    };
  }

  static async getValue(key: string): Promise<string | null> {
    try {
      const response = await fetch(
        `${this.BASE_URL}/accounts/${this.ACCOUNT_ID}/storage/kv/namespaces/${this.NAMESPACE_ID}/values/${key}`,
        {
          headers: this.getHeaders()
        }
      );

      if (!response.ok) {
        throw new Error(`KV request failed: ${response.statusText}`);
      }

      const data: KVResponse = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error fetching from KV:', error);
      return null;
    }
  }

  static async setValue(key: string, value: string): Promise<boolean> {
    try {
      const response = await fetch(
        `${this.BASE_URL}/accounts/${this.ACCOUNT_ID}/storage/kv/namespaces/${this.NAMESPACE_ID}/values/${key}`,
        {
          method: 'PUT',
          headers: this.getHeaders(),
          body: JSON.stringify(value)
        }
      );

      if (!response.ok) {
        throw new Error(`KV request failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error('Error setting KV value:', error);
      return false;
    }
  }
} 