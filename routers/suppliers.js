const express = require('express')
const Supplier = require('../models/suppliers')
const router = new express.Router()

router.post('/suppliers', async (req, res) => {
    const supplier = new Supplier(req.body)

    try{
        await supplier.save()
        res.status(201).send(supplier)
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.get('/suppliers', async (req, res) => {
    try{
        const supplier = await Supplier.find({})
        res.send(supplier)
    }
    catch(e){
        res.status(500).send()
    }
})

router.get('/suppliers/:id', async (req, res) => {
    const _id = req.params.id

    try{
        const supplier = await Supplier.findById(_id)
        
        if(!supplier){
            return res.status(404).send()
        }

        res.send(supplier)
    }
    catch(e){
        res.status(500).send()
    }
})

router.patch('/suppliers/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['supplierName', 'supplierMaterials']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try{
        const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        
        if(!supplier){
            return res.status(404).send()
        }

        res.send(supplier)
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.delete('/suppliers/:id', async (req, res) => {
    try{
        const supplier = await Supplier.findByIdAndDelete(req.params.id)
        
        if(!supplier){
            return res.status(404).send()
        }

        res.send(supplier)
    }
    catch(e){
        res.status(500).send()
    }
})

module.exports = router
