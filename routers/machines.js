const express = require('express')
const Machine = require('../models/machines')
const router = new express.Router()

router.post('/machines', async (req, res) => {
    const machine = new Machine(req.body)

    try{
        await machine.save()
        res.status(201).send(machine)
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.get('/machines', async (req, res) => {
    try{
        console.log('Called from Android Studio!')
        const machine = await Machine.find({})
        res.send(machine)
    }
    catch(e){
        res.status(500).send()
    }
})

router.get('/machines/:id', async (req, res) => {
    const _id = req.params.id

    try{
        const machine = await Machine.findById(_id)
        
        if(!machine){
            return res.status(404).send()
        }

        res.send(machine)
    }
    catch(e){
        res.status(500).send()
    }
})

router.patch('/machines/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['machineName', 'machineBrand']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try{
        const machine = await Machine.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        
        if(!machine){
            return res.status(404).send()
        }

        res.send(machine)
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.delete('/machines/:id', async (req, res) => {
    try{
        const machine = await Machine.findByIdAndDelete(req.params.id)
        
        if(!machine){
            return res.status(404).send()
        }

        res.send(machine)
    }
    catch(e){
        res.status(500).send()
    }
})

module.exports = router
