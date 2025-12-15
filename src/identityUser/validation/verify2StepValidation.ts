
import { z } from 'zod';

export const verify2StepSchema = () => {
    return z.object({
        username: z
            .string(),
        token: z
            .string(),
<<<<<<< HEAD
        remember: z
            .string()
            .optional()
            .transform(val => val === "on"),
        emailOrOTP: z
            .string()
            .optional()
            .transform(val => val === "on"),
=======
>>>>>>> be9c483b74454327489f9e0de268e1c6b4423d09
    })
};

