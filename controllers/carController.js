const fs = require("fs")
const Car = require("./../models/carModel")

const getCars = async (req, res, next) => {
    try {
        const queryObject = { ...req.query }
        const excludedColumn = ["page", "sort", "limit", "fields"]
        excludedColumn.forEach((el) => delete queryObject[el])

        console.log(req.query, queryObject)

        let queryStr = JSON.stringify(queryObject).replace(/{|\}|"/g, 
        (match) => `$${match}`) // To remove curly brackets
        queryStr = JSON.parse(queryStr)

        let query = Car.find(queryStr)

        // Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ")
            query = query.sort(sortBy)
        } else {
            query = query.sort("-createdAt")
        }

        // Field limiting
        if (req.query.fields) {
        const fields = req.query.fields.split(",").join(" ")
        query = query.select(fields)
        } else {
            query = query.select("-__v")
        }

        // Pagination
        const page = parseInt(req.query.page ? req.query.page : 1)
        const limit = parseInt(req.query.limit ? req.query.limit : 6)
        const skip = (page - 1) * limit

        const totalCarCounts = await Car.countDocuments()
        const cars = await query.skip(skip).limit(limit).exec()
        
        return res.status(200).json({
            success: true,
            count: cars.length,
            pages: Math.ceil(totalCarCounts / limit),
            data: cars
        })
    } catch (err) {
        console.error(err.message)
        res.status(400).json({
            status: "fail",
            message: err.message,
          });
    }
}

const getCarById = async  (req, res) => {
    try{
        const id = req.params.id;
        const car = await Car.findById(id)
        res.status(200).json({
            status: "success",
            data: {
                car
            }
        })
    } catch(err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        })
    }
}

const updateCar = async (req, res) => {
    try {
        const id = req.params.id

        const car = await Car.findByIdAndUpdate(id, req.body, {
            new:true, //return the updated document
            runValidators: true //validate before saving
        })
        
        res.status(200).json({
            status:"succes",
            message: "data updated",
            data:{car}
        })
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        })
    }
}

const deleteCar = async (req, res) => {
    try {
        const id = req.params.id;
        
        await Car.findByIdAndDelete(id)
        res.status(204).json({
            status: 'success',
            message:'Data has been deleted'
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        })
    }
}

const createCar = async (req, res) => {
    try {
        const newCar = await Car.create(req.body)
        res.status(201).json({
            status: 'success',
            data:newCar
        })
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        })
    }
}

module.exports = {getCars, getCarById, updateCar, deleteCar, createCar};