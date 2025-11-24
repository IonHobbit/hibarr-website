'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import useDownloadFileDetails from '@/hooks/useDownloadFileDetails';
import { useMutation } from '@tanstack/react-query';
import { DownloadError } from '@/lib/errors/download.errors';

interface DownloadPageProps {
    params: Promise<{ slug: string }>;
}

export default function DownloadPage({ params }: DownloadPageProps) {
    const { slug } = use(params);
    const router = useRouter();
    const decodedSlug = decodeURIComponent(slug);

    const { data: fileDetails, isLoading, isError, error } = useDownloadFileDetails(decodedSlug);

    const { mutate: downloadFile, isPending, isSuccess, isError: isDownloadError, error: downloadError } = useMutation({
        mutationFn: async () => {
            const fileName = fileDetails?.originalName || decodedSlug.split('/').pop() || decodedSlug;
            const downloadUrl = `/api/downloads/${encodeURIComponent(decodedSlug)}`;
            const response = await fetch(downloadUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            a.click();
        },
    });

    const fileName = fileDetails?.originalName || decodedSlug.split('/').pop() || decodedSlug;
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    const errorCode = (error as DownloadError)?.code as string | undefined;
    const statusCode = (error as DownloadError)?.statusCode as number | undefined;

    // Loading state (checking file)
    if (isLoading) {
        return (
            <div className="section flex flex-col items-center justify-center min-h-screen gap-4">
                <Icon icon="mdi:loading" className="size-10 animate-spin" />
                <h1 className="text-2xl font-bold">Retrieving file information...</h1>
                {/* <p className="text-muted-foreground">Please wait while we fetch the file details</p> */}
            </div>
        );
    }

    // Error state - file not found
    if (isError && (errorCode === 'FILE_NOT_FOUND' || statusCode === 404 || errorMessage.toLowerCase().includes('not found'))) {
        return (
            <div className="section flex flex-col items-center justify-center min-h-screen gap-4">
                <Icon icon="mdi:close-circle-outline" className="size-10 text-red-500" />
                <h1 className="text-2xl font-bold">File Not Found</h1>
                <p className="text-muted-foreground">The file you are looking for does not exist or has been removed.</p>
            </div>
        );
    }

    // Error state - permission denied
    if (isError && (errorCode === 'PERMISSION_DENIED' || statusCode === 403)) {
        return (
            <div className="section flex flex-col items-center justify-center min-h-screen gap-4">
                <Icon icon="mdi:lock-alert" className="size-10 text-orange-500" />
                <h1 className="text-2xl font-bold">Access Denied</h1>
                <p className="text-muted-foreground">You don&apos;t have permission to access this file.</p>
                <button
                    onClick={() => router.push('/')}
                    className="mt-4 text-primary underline underline-offset-4 hover:opacity-80 transition-opacity"
                >
                    Return to Home
                </button>
            </div>
        );
    }

    // Error state - service unavailable
    if (isError && (errorCode === 'SERVICE_UNAVAILABLE' || errorCode === 'CONNECTION_ERROR' || statusCode === 503)) {
        return (
            <div className="section flex flex-col items-center justify-center min-h-screen gap-4">
                <Icon icon="mdi:cloud-off-outline" className="size-10 text-red-500" />
                <h1 className="text-2xl font-bold">Service Unavailable</h1>
                <p className="text-muted-foreground">The storage service is currently unavailable. Please try again later.</p>
                <button
                    onClick={() => router.push('/')}
                    className="mt-4 text-primary underline underline-offset-4 hover:opacity-80 transition-opacity"
                >
                    Return to Home
                </button>
            </div>
        );
    }

    // Error state - other errors
    if (isError) {
        return (
            <div className="section flex flex-col items-center justify-center min-h-screen gap-4">
                <Icon icon="mdi:close-circle" className="size-10 text-red-500" />
                <h1 className="text-2xl font-bold">Error</h1>
                <p className="text-muted-foreground">{errorMessage || 'An error occurred while processing your request.'}</p>
                <button
                    onClick={() => router.push('/')}
                    className="mt-4 text-primary underline underline-offset-4 hover:opacity-80 transition-opacity"
                >
                    Return to Home
                </button>
            </div>
        );
    }

    if (isSuccess) {
        return (
            <div className="section flex flex-col items-center justify-center min-h-screen gap-4">
                <Icon icon="mdi:check-circle-outline" className="size-10 text-green-500" />
                <h1 className="text-2xl font-bold">Download Completed</h1>
                <p className="text-muted-foreground">Please check your downloads folder.</p>
            </div>
        );
    }

    if (isDownloadError) {
        return (
            <div className="section flex flex-col items-center justify-center min-h-screen gap-4">
                <Icon icon="mdi:close-circle" className="size-10 text-red-500" />
                <h1 className="text-2xl font-bold">Error</h1>
                <p className="text-muted-foreground">{downloadError.message || 'An error occurred while downloading the file.'}</p>

                <Button
                    onClick={() => downloadFile()}
                    isLoading={isPending}
                    variant="default"
                    className="mt-4"
                    id='retry-download-button'
                >
                    <div className="flex items-center gap-2">
                        <Icon icon="mdi:download" />
                        Retry Download
                    </div>
                </Button>
            </div>
        );
    }

    // Success state - file found
    if (fileDetails) {
        // const fileSize = fileDetails.size ? `${(fileDetails.size / 1024 / 1024).toFixed(2)} MB` : null;

        return (
            <div className="section flex flex-col items-center justify-center min-h-screen gap-3">
                <Icon icon="mdi:check-circle-outline" className="size-10 text-green-500" />
                <h1 className="text-2xl font-bold">File Ready</h1>
                <div className="flex flex-col items-center gap-1">
                    {fileName && (
                        <p className="text-lg font-medium text-foreground">{fileName}</p>
                    )}
                    {isPending && (
                        <p className="text-xs text-muted-foreground animate-pulse">Downloading file...</p>
                    )}
                </div>
                <Button
                    onClick={() => downloadFile()}
                    variant="default"
                    className="mt-4"
                    id='begin-download-button'
                >
                    <div className="flex items-center gap-2">
                        {isPending ? <Icon icon="mdi:loading" className="size-4 animate-spin shrink-0" /> : <Icon icon="mdi:download" />}
                        Begin Download
                    </div>
                </Button>
            </div>
        );
    }

    // Fallback (shouldn't reach here)
    return (
        <div className="section flex flex-col items-center justify-center min-h-screen gap-4">
            <Icon icon="mdi:loading" className="size-10 animate-spin" />
            <h1 className="text-2xl font-bold">Loading...</h1>
        </div>
    );
}
