const express = require('express')
const Contractor = require('../models/contractors')
const router = new express.Router()

router.post('/contractors', async (req, res) => {
    const contractor = new Contractor(req.body)

    try{
        await contractor.save()
        res.status(201).send(contractor)
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.get('/contractors', async (req, res) => {
    try{
        const contractor = await Contractor.find({})
        res.send(contractor)
    }
    catch(e){
        res.status(500).send()
    }
})

router.get('/contractors/:id', async (req, res) => {
    const _id = req.params.id

    try{
        const contractor = await Contractor.findById(_id)
        
        if(!contractor){
            return res.status(404).send()
        }

        res.send(contractor)
    }
    catch(e){
        res.status(500).send()
    }
})

router.patch('/contractors/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['contractorName', 'contractorSpecialty']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try{
        const contractor = await Contractor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        
        if(!contractor){
            return res.status(404).send()
        }

        res.send(contractor)
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.delete('/contractors/:id', async (req, res) => {
    try{
        const contractor = await Contractor.findByIdAndDelete(req.params.id)
        
        if(!contractor){
            return res.status(404).send()
        }

        res.send(contractor)
    }
    catch(e){
        res.status(500).send()
    }
})

module.exports = router
