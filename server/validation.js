import { z } from 'zod';

export const messageSchema = z.object({
  body: z.string().min(1).max(2000),
  room: z.string().min(1).max(64),
});

export const validate = (schema) => (req, res, next) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(422).json({ error: parsed.error.issues });
  req.body = parsed.data;
  next();
};
