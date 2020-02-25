import * as Express from "express";
import Hero from "../models/hero";

const findAll = async (req: Express.Request, res: Express.Response) => {
        // Return list of all characters from data crawled from website
}

const findById = async (req: Express.Request, res: Express.Response) => {
        // Return 1 character (based on id) from data crawled from website
}

export default {
    findAll,
    findById
}