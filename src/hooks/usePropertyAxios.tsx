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

export default function usePropertyAxios() {
    const axiosInstance = axios.create({
        baseURL: CRM_API_URL,
        headers: {
            'Content-Type': 'application/json',
            'X-API-TOKEN': CRM_API_TOKEN,
            'X-COMPANY-ID': 1,
        },
    });

    axiosInstance.interceptors.request.use(
        (config) => {
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (response: AxiosResponse) => {
            return response;
        },
        (error: AxiosError) => {
            // Handle axios errors and convert to our custom error format
            if (error.response) {
                // Server responded with error status
                const { data, status } = error.response;
                const errorData = data as { message: string; details: unknown; code: string };

                throw new APIRequestError(
                    errorData?.message || error.message,
                    status || 500,
                    errorData?.details || errorData,
                    errorData?.code
                );
            } else if (error.request) {
                // Request was made but no response received
                throw new APIRequestError(
                    'No response from server. Please check your connection.',
                    0,
                    { originalError: error.message }
                );
            } else {
                // Something else happened
                throw new APIRequestError(
                    error.message || 'An unexpected error occurred',
                    500,
                    { originalError: error.message }
                );
            }
        }
    );

    return axiosInstance;
}
