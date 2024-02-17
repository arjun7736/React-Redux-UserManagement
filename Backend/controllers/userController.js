import express from "express";

const test = (req,res) => {
    res.json({
        messsage: "hi there"
    })
}

export { test }