require("dotenv").config()
const mongoose = require("mongoose")
const fs = require("fs")
const Car = require("../models/carModel")

const DB = process.env.DATABASE

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((con) => console.log("Connected to MongoDB"))
    .catch((err) => console.error(err))

// Read JSON File
const cars = JSON.parse(fs.readFileSync("./data/cars.json", "utf-8"))

const importData = async () => {
    try {
        await Car.create(cars)
        console.log("Data imported successfully!")
    } catch(err){
        console.log(err)
    }
}

const clearData = async () => {
    try{
        await Car.deleteMany({})
        console.log("Data deleted successfully!")
    } catch (err) {
        console.log(err)
    }
    process.exit()
}

if (process.argv[2] === "-i") {
    importData()
} else if (process.argv[2] === "-d") {
    clearData()
} 