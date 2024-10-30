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

const todoSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
});

const taskSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    priority: z.string().optional(),
    assignedBy: z.string(),
    dueDate: z.string().optional(),
});

const updateSchema = z.object({
    completed: z.boolean(),
});

const collaboratorSchema = z.object({
    userids: z.array(z.string()).nonempty({ message: "User IDs cannot be empty" }),
});

module.exports = {
    registrationSchema,
    loginSchema,
    todoSchema,
    taskSchema,
    updateSchema,
    collaboratorSchema
}