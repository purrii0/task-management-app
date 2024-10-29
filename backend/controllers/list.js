const { User, Task, Todo } = require("../db/db");

const create = async (req, res) => {
    try {
        const id = req.id;
        const { title } = req.body;
        await Todo.create({
            owner: id,
            title
        })
        return res.status(200).json({ message: "Tdod successfully created" })
    } catch (error) {
        return res.status(400).json({ message: "Something Went Wrong" })
    }
};

const task = async (req, res) => {
    try {
        const listid = req.params.listid;
        const id = req.id;
        const { title, priority, assignedBy } = req.body;
        await Task.create({
            title,
            priority,
            dueDate: new Date(),
            assignedBy,
            assignedTo: id
        })
        res.status(201).json({ message: "Task Succesfully Created" })
    } catch (error) {
        return res.status(400).json({ message: "Something Went Wrong" })
    }
}

const update = async (req, res) => {
    try {
        const listid = req.params.listid;
        const taskid = req.params.taskid;
        const id = req.id;
        const { completed } = req.body;
        await Task.findOneAndUpdate({
            completed: completed
        })
        res.status(200).json({ message: "Task updated successfully" })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "Something Went Wrong" })
    }
}

const deleteTask = async (req, res) => {
    try {
        const listid = req.params.listid;
        const taskid = req.params.taskid;
        const id = req.id;
        await Task.findOneAndDelete({ _id: taskid })
        res.status(200).json({ message: "Task Deleted Successfully" })
    } catch (error) {
        return res.status(400).json({ message: "Something Went Wrong" })
    }
}

const addCollabrator = async (req, res) => {
    try {
        const listid = req.params.listid;
        const id = req.id;
        const { userid } = req.body;
        await Todo.findOneAndUpdate({ collabrators: userid })
        res.status(200).json({ message: "Collaborator added successfully" })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "Something Went Wrong" })
    }
}

const deleteCollabrator = async (req, res) => {
    const listid = req.params.listid;
    const userid = req.params.userid;
    const todo = await Todo.findOne({ collabrators: userid });
    let index = todo.collabrators.findIndex(user => user === userid)
    todo.collabrators.splice(index, 1);
    await todo.save();
    res.status(200).json({ message: "Collabratore Removed" })
}

module.exports = { create, task, update, deleteTask, addCollabrator, deleteCollabrator };