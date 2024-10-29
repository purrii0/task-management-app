const { z } = require("zod")

const registrationSchema = z.object({
    name: z.string().min(1),
    username: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
    profilePicture: z.string()
});

const loginSchema = z.object({
    email: z.string().min(1),
    password: z.string().min(1)
})

module.exports = {
    registrationSchema,
    loginSchema
}