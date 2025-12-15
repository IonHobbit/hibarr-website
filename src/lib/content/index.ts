const baseVersion = '1.0.5';
const gitSha = (process.env.NEXT_PUBLIC_GIT_SHA || '').trim().slice(0, 7);

export const version = gitSha ? `${baseVersion}-${gitSha}` : baseVersion;