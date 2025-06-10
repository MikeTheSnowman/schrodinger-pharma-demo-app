import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

interface KVResponse {
  success: boolean;
  result: string | null;
  errors: any[];
}

const BASE_URL = 'https://api.cloudflare.com/client/v4';
const ACCOUNT_ID = 'c6f1381f5ef948330ede87ce8dba5714';
const NAMESPACE_ID = '9016759b583a4d6e89c8d210ca45dd0b';

function getHeaders(): HeadersInit {
    return {
      'Authorization': `Bearer ${env.CLOUDFLARE_API_TOKEN}`,
      'Content-Type': 'application/json'
    };
}

export const GET: RequestHandler = async ({ url }) => {
  try {
    const medicationId = "recall-status-" + url.searchParams.get('medicationId');
    if (!medicationId) {
      return json({ error: 'medicationId query parameter is required' }, { status: 400 });
    }

    const response = await fetch(
      `${BASE_URL}/accounts/${ACCOUNT_ID}/storage/kv/namespaces/${NAMESPACE_ID}/values/${medicationId}`,
      {
        headers: getHeaders()
      }
    );

    if (!response.ok) {
      throw new Error(`KV request failed: ${response.statusText}`);
    }

    const data: KVResponse = await response.json();
    //console.log("data: " + data);
    return json(data);
  } catch (error) {
    console.error('Error fetching from KV:', error);
    return json({ recallStatus: null });
  }
}; 