export type Result<T> = { ok: false; error: string } | { ok: true; value: T }
