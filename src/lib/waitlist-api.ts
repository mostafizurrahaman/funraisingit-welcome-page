/**
 * Waitlist API Client for FunRaisingIt
 * Connects frontend to the backend server endpoints:
 * - POST /api/v1/waitlist/email
 * - POST /api/v1/waitlist/claim-vip
 * - POST /api/v1/waitlist/skip-vip
 */

export type TWaitlistStatus = 'registered' | 'vip' | 'skipped_vip';

export interface WaitlistEntry {
  _id: string;
  email: string;
  phoneNumber?: string | null;
  status: TWaitlistStatus;
  memberNumber: number;
  formattedMemberNumber: string;
  isVip: boolean;
  vipClaimedAt?: string | null;
  vipSkippedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode?: number;
  message?: string;
  data: T;
  errorSources?: Array<{ path: string; message: string }>;
  stack?: string;
}

export interface WaitlistResponse {
  waitlist: WaitlistEntry;
  message: string;
  statusCode: number;
  isNew: boolean;
}

// API Base URL - supports environment variable, defaults to relative /api/v1 (which proxies via Next.js rewrite) or direct server url
const getApiBaseUrl = (): string => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/+$/, '');
  }
  if (typeof window !== 'undefined') {
    return '/api/v1';
  }
  return 'http://localhost:8080/api/v1';
};

/**
 * Helper to execute JSON fetch and handle errors gracefully
 */
async function fetchApi<T>(endpoint: string, body: Record<string, unknown>): Promise<ApiResponse<T>> {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  let res: Response;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });
  } catch (err: unknown) {
    const errorMsg =
      err instanceof Error && err.message
        ? err.message
        : 'Network connection error';
    throw new Error(
      `Unable to connect to the server (${errorMsg}). Please verify the backend is running.`
    );
  }

  let json: ApiResponse<T> | null = null;
  try {
    json = await res.json();
  } catch {
    // If not JSON
    if (!res.ok) {
      throw new Error(`Server returned error ${res.status}: ${res.statusText}`);
    }
  }

  if (!res.ok || !json?.success) {
    let errorDetail = json?.message || 'Something went wrong. Please try again.';

    if (json?.errorSources && json.errorSources.length > 0) {
      const fieldMessages = json.errorSources
        .map((es) => es.message)
        .filter(Boolean)
        .join('. ');
      if (fieldMessages) {
        errorDetail = fieldMessages;
      }
    }

    const error = new Error(errorDetail);
    (error as Error & { statusCode?: number }).statusCode = res.status;
    throw error;
  }

  return json;
}

/**
 * 1. Submit email to join waitlist or retrieve existing status
 * Endpoint: POST /api/v1/waitlist/email
 */
export async function submitWaitlistEmail(email: string): Promise<WaitlistResponse> {
  const cleanEmail = email.trim().toLowerCase();
  const response = await fetchApi<WaitlistEntry>('/waitlist/email', {
    email: cleanEmail,
  });

  const statusCode = response.statusCode || 200;
  const isNew = statusCode === 201;

  return {
    waitlist: response.data,
    message: response.message || (isNew ? 'Successfully joined the waitlist!' : 'Welcome back to the waitlist!'),
    statusCode,
    isNew,
  };
}

/**
 * 2. Claim VIP early access with phone number verification
 * Endpoint: POST /api/v1/waitlist/claim-vip
 */
export async function claimWaitlistVip(
  email: string,
  phoneNumber: string
): Promise<{ waitlist: WaitlistEntry; message: string }> {
  const cleanEmail = email.trim().toLowerCase();
  const cleanPhone = phoneNumber.trim();

  const response = await fetchApi<WaitlistEntry>('/waitlist/claim-vip', {
    email: cleanEmail,
    phoneNumber: cleanPhone,
  });

  return {
    waitlist: response.data,
    message:
      response.message ||
      `Congratulations! You've claimed VIP Early Access as Member ${response.data?.formattedMemberNumber || ''}.`,
  };
}

/**
 * 3. Skip VIP upgrade and confirm standard waitlist access
 * Endpoint: POST /api/v1/waitlist/skip-vip
 */
export async function skipWaitlistVip(
  email: string
): Promise<{ waitlist: WaitlistEntry; message: string }> {
  const cleanEmail = email.trim().toLowerCase();

  const response = await fetchApi<WaitlistEntry>('/waitlist/skip-vip', {
    email: cleanEmail,
  });

  return {
    waitlist: response.data,
    message:
      response.message ||
      `You are confirmed on the waitlist as Member ${response.data?.formattedMemberNumber || ''}.`,
  };
}
