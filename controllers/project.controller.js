import Project from "../models/project.models.js";

// Create Project (Admin, Manager)
export const createProject = async (req, res) => {
  try {
    const { name, description, companyId, createdBy } = req.body;

    const newProject = new Project({
      name,
      description,
      companyId,
      createdBy,
    });

    await newProject.save();
    res.status(201).json({ message: "Project created successfully" });
  } catch (error) {
    console.error("Create project error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// List Projects (Admin, Manager)
export const listProjects = async (req, res) => {
  try {
    const projects = await Project.find({ companyId: req.params.companyId });
    res.status(200).json(projects);
  } catch (error) {
    console.error("List projects error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Project (Admin, Manager)
export const updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { name, description } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(projectId, {
      name,
      description,
    }, { new: true });

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project updated successfully", updatedProject });
  } catch (error) {
    console.error("Update project error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
