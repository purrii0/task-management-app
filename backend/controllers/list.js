const { string } = require("zod");
const { todoSchema, taskSchema, updateSchema, collaboratorSchema } = require("../zod/validation")
const { User, Task, Todo } = require("../db/db");

const create = async (req, res) => {
    try {
        const id = req.id;
        const { title } = todoSchema.parse(req.body);

        const todo = await Todo.create({
            owner: id,
            title
        })
        return res.status(201).json({
            message: "To-do list successfully created", todo
        })
    } catch (error) {
        console.error("Error creating To-do list:", error);
        return res.status(400).json({ message: "Something Went Wrong" })
    }
};

const task = async (req, res) => {
    try {
        const listid = req.params.listid;
        const id = req.id;
        const { title, priority, assignedBy, dueDate } = taskSchema.parse(req.body);
        const task = await Task.create({
            title,
            priority,
            dueDate: dueDate ? new Date(dueDate) : undefined,
            assignedBy,
            assignedTo: id,
            listid
        })
        if (!task) { return res.status(404).json({ message: "Task not found" }) }

        return res.status(201).json({ message: "Task added Succesfully", task })
    } catch (error) {
        console.error("Error creating Task:", error);
        return res.status(400).json({ message: "Something Went Wrong" })
    }
}

const update = async (req, res) => {
    try {
        const listid = req.params.listid;
        const taskid = req.params.taskid;
        const id = req.id;
        const { completed } = updateSchema.parse(req.body);
        const task = await Task.findOneAndUpdate(
            { _id: taskid, assignedTo: id },
            { completed },
            { new: true }
        )
        if (!task) { return res.status(404).json({ message: "Task not found" }) }

        return res.status(200).json({ message: "Task updated successfully", task })

    } catch (error) {
        console.error("Error updating Task:", error);
        return res.status(400).json({ message: "Something Went Wrong" })
    }
}

const deleteTask = async (req, res) => {
    try {
        const listid = req.params.listid;
        const taskid = req.params.taskid;
        const id = req.id;
        const task = await Task.findOneAndDelete({ _id: taskid, assignedTo: id, listid })
        if (!task) {
            return res.status(404).json({ message: "Task not found or unauthorized" });
        }
        res.status(200).json({ message: "Task Deleted Successfully" })
    } catch (error) {
        console.error("Error deleting task:", error);
        return res.status(400).json({ message: "Something Went Wrong" })
    }
}

const addCollabrator = async (req, res) => {
    try {
        const listid = req.params.listid;
        const id = req.id;
        const { userids } = collaboratorSchema.parse(req.body);

        const collab = await Todo.findOneAndUpdate(
            { _id: listid, owner: id },
            { $addToSet: { collabrators: { $each: userids } } },
            { new: true }
        )
        if (!collab) {
            return res.status(404).json({ message: "To-do list not found or unauthorized" });
        }

        res.status(200).json({ message: "Collaborator added successfully", collab });

    } catch (error) {
        console.error("Error adding collaborators:", error);
        return res.status(400).json({ message: "Something went wrong" });
    }
}

const deleteCollabrator = async (req, res) => {
    try {
        const listid = req.params.listid;
        const userid = req.params.userid;
        const id = req.id;
        const todo = await Todo.findOneAndUpdate(
            { _id: listid, owner: id },
            { $pull: { collabrators: userid } },
            { new: true }
        );
        if (!todo) {
            return res.status(404).json({ message: "To-do list not found or unauthorized" });
        }

        res.status(200).json({ message: "Collaborator removed successfully", todo });
    } catch (error) {
        console.error("Error removing collaborator:", error);
        return res.status(400).json({ message: "Something went wrong" });
    }
};

module.exports = { create, task, update, deleteTask, addCollabrator, deleteCollabrator };