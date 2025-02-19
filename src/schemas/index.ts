import { createId } from "@paralleldrive/cuid2";
import * as v from 'valibot';

export const idSchema = v.fallback(v.pipe(v.string(), v.cuid2()), () => createId());
export type ID = v.InferOutput<typeof idSchema>;

export const userSchema = v.object({
    id: idSchema,
    avatar: v.pipe(v.string(), v.minLength(10)),
    email: v.pipe(v.string(), v.minLength(10)),
    name: v.pipe(v.string(), v.minLength(10)),
    created_at: v.date(),
});

export type User = v.InferOutput<typeof userSchema>;

export const specsSchema = v.object({
    id: idSchema,
    category: v.pipe(v.number()),
    dpi: v.pipe(v.number()),
    height_mm: v.pipe(v.number()),
    height_px: v.pipe(v.number()),
    width_mm: v.pipe(v.number()),
    width_px: v.pipe(v.number()),
    sort: v.pipe(v.number()),
    icon: v.pipe(v.number()),
    name: v.pipe(v.string()),
});

export type Specs = v.InferOutput<typeof specsSchema>;

export const photoSchema = v.object({
    id: idSchema,
    user_id: v.pipe(v.string()),
    name: v.pipe(v.string()),
    file_name: v.pipe(v.string()),
    file_path: v.pipe(v.string()),
    colorize_key: v.pipe(v.string()),
    processing_key: v.pipe(v.string()),
    width: v.pipe(v.number()),
    height: v.pipe(v.number()),
    created_at: v.pipe(v.string()),
});

export type Photos = v.InferOutput<typeof photoSchema>;