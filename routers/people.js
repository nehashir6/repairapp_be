const express = require('express')
const conn = require('../db/mongoose')
const Person = require('../models/people')
const Supplier = require('../models/suppliers')
const Contractor = require('../models/contractors')
const router = new express.Router()

router.post('/people', async (req, res) => {
    const person = new Person(req.body)

    try{
        await person.save()
        res.status(201).send(person)
    }
    catch(e){
        res.status(400).send(e)
    }
})

// router.post('/all', async (req, res) => {
//     const person = new Person(req.body)
//     const supplier = new Supplier(req.body)
//     const contractor = new Contractor(req.body)

//     try{
//         await person.save()
//         await supplier.save()
//         await contractor.save()
//     }
//     catch(e){
//         console.log(e)
//     }
//     finally{
//         res.status(201).send('Inserted')
//     }
// })

// router.post('/all', async (req, res) => {
//     const session = await conn.startSession();

//     const person = new Person(req.body)
//     const supplier = new Supplier(req.body)
//     const contractor = new Contractor(req.body)

//     try{
//         session.startTransaction();

//         await person.save({session});
//         console.log("1111")
//         await supplier.save({session});
//         console.log("2222222")
//         await contractor.save().session({session});

//         await session.commitTransaction();
//     }
//     catch(e){
//         console.log(e)

//         await session.abortTransaction();

//         console.log('aborted')
//     }
//     finally{
//         res.status(201).send('Inserted')
//     }

//     session.endSession();
// })

router.get('/people', async (req, res) => {
    try{
        const people = await Person.find({})
        res.send(people)
    }
    catch(e){
        res.status(500).send()
    }
})

router.get('/people/:id', async (req, res) => {
    const _id = req.params.id

    try{
        const person = await Person.findById(_id)
        
        if(!person){
            return res.status(404).send()
        }

        res.send(person)
    }
    catch(e){
        res.status(500).send()
    }
})

router.patch('/people/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age', 'hobbies']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try{
        const person = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        
        if(!person){
            return res.status(404).send()
        }

        res.send(person)
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.delete('/people/:id', async (req, res) => {
    try{
        const person = await Person.findByIdAndDelete(req.params.id)
        
        if(!person){
            return res.status(404).send()
        }

        res.send(person)
    }
    catch(e){
        res.status(500).send()
    }
})

module.exports = router
