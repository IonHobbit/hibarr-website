'use client';

import axios, { AxiosError, AxiosResponse } from 'axios';
import { APIRequestError } from '@/lib/services/api.service';

export type APIPaginatedResponse<T> = {
    current_page: number;
    data: T[];
    from: number;
    last_page: number;
    next_page_url: string | null;
    per_page: number;
    prev_page_url: string | null;
    status: string;
    to: number;
    total: number;
};

const CRM_API_URL = process.env.NEXT_PUBLIC_CRM_API_URL;
const CRM_API_TOKEN = process.env.NEXT_PUBLIC_CRM_API_TOKEN;

export const propertyApi = axios.create({
    baseURL: CRM_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'X-API-TOKEN': CRM_API_TOKEN,
        'X-COMPANY-ID': 1,
    },
});

propertyApi.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        if (error.response) {
            const { data, status } = error.response;
            const errorData = data as { message: string; details: unknown; code: string };
            throw new APIRequestError(
                errorData?.message || error.message,
                status || 500,
                errorData?.details || errorData,
                errorData?.code
            );
        } else if (error.request) {
            throw new APIRequestError('No response from server.', 0, { originalError: error.message });
        } else {
            throw new APIRequestError(error.message || 'Unexpected error', 500);
        }
    }
);