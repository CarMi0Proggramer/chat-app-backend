import z from "zod";

const userSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Email must be valid" }),
    password: z.string().min(1, { message: "Password is required" }),
});

export function validateUser(data: any) {
    const result = userSchema.safeParse(data);
    if (!result.success) {
        return { success: false, data: JSON.parse(result.error.message) };
    }

    return { success: true, data: result.data };
}

export function validatePartialUser(data: any) {
    const result = userSchema.partial().safeParse(data);
    if (!result.success) {
        return { success: false, data: JSON.parse(result.error.message) };
    }

    return { success: true, data: result.data };
}
