const { User, Task, Todo } = require("../db/db");
const auth = require("../auth/auth");

const create = [auth, async (req, res) => {
    try {
        const userId = req.id;
        const { title } = req.body;
        await Todo.create({
            userId,
            title
        })
        return res.status(200).json({ message: "Tdod successfully created" })
    } catch (error) {
        return res.status(400).json({ message: "Something Went Wrong" })
    }
}];

const task = [auth, async (req, res) => {
    try {
        const listid = req.params.listid;
        const userId = req.id;
        const { title, priority, assignedBy } = req.body;
        await Task.create({
            title,
            priority,
            dueDate: new Date(),
            assignedBy,
            assignedTo: userId
        })
        res.status(201).json({ message: "Task Succesfully Created" })
    } catch (error) {
        return res.status(400).json({ message: "Something Went Wrong" })
    }
}]


module.exports = { create, task };