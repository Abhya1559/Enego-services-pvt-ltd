import Company from "../models/company.models.js";

export const createCompany = async (req,res) =>{

    const company = await Company.create(req.body)
    res.status(201).json(company)
}