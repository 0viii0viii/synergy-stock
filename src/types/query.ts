import { UseQueryOptions } from '@tanstack/react-query';

export type Params<P> = P & { signal: AbortSignal };

export type QueryProps<Params> = { params: Omit<Params, 'signal'> } & Omit<UseQueryOptions, 'queryKey' | 'queryFn'>;
