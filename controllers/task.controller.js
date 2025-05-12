import Task from "../models/task.models.js";

// Create Task (Admin, Manager)
export const createTask = async (req, res) => {
  try {
    const { title, description, projectId, assignedTo } = req.body;

    const newTask = new Task({
      title,
      description,
      status: "To Do", // Default status
      projectId,
      assignedTo,
    });

    await newTask.save();
    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    console.error("Create task error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// List Tasks (Admin, Manager)
export const listTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ projectId: req.params.projectId });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("List tasks error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Task (Admin, Manager, Member)
export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, status, assignedTo } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(taskId, {
      title,
      description,
      status,
      assignedTo,
    }, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    console.error("Update task error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
