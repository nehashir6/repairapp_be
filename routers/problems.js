const express = require('express')
const Problem = require('../models/problems')
const router = new express.Router()

//Submit a problem and solution
router.post('/problems', async (req, res) => {
    const problem = new Problem(req.body)

    try{
        const myTags = req.body.problemDescription.split(' ')
        console.log(myTags)
        problem['tags'] = myTags
        console.log(problem)
        await problem.save()
        res.status(201).send(problem)
    }
    catch(e){
        res.status(400).send(e)
    }
})

//Read all problems and solutions
router.get('/problems', async (req, res) => {
    try{
        const problem = await Problem.find({})
        res.send(problem)
    }
    catch(e){
        res.status(500).send()
    }
})

//Read all unique Machine Model Numbers (for dropdown)
router.get('/modelNumbers', async (req, res) => {
    try{
        const modelNum = await Problem.distinct("machineModelNo")

        console.log("modelNumbers called" + modelNum )
        res.send( modelNum )
    }
    catch(e){
        res.status(500).send()
    }
})

//Read all problems and solutions by Problem ID
router.get('/problems/:id', async (req, res) => {
    const _id = req.params.id

    try{
        const problem = await Problem.findById(_id)
        
        if(!problem){
            return res.status(404).send()
        }

        res.send(problem)
    }
    catch(e){
        res.status(500).send()
    }
})

//Read all problems and solutions by Model No.
router.get('/problemsByModelNo', async (req, res) => {
    try{
        console.log('Called from Android Studio!')
        const problem = await Problem.find({ machineModelNo: req.query.modelNo })
        
        if(!problem){
            return res.status(404).send()
        }

        res.send(problem)
    }
    catch(e){
        res.status(500).send()
    }
})

//Read all problems and solutions by Machine ID
router.get('/problemsByMachineID', async (req, res) => {
    try{
        const problem = await Problem.find({ machineID: req.query.machineID })
        
        if(!problem){
            return res.status(404).send()
        }

        res.send(problem)
    }
    catch(e){
        res.status(500).send()
    }
})

//Read all problems and solutions by Machine ID and Problem Description
// router.get('/problemNameAndMachineID', async (req, res) => {
//     try{
//         const problem = await Problem.find({ machineID: req.query.machineID, problemDescription: req.query.problemDescription })
        
//         if(!problem){
//             return res.status(404).send()
//         }

//         res.send(problem)
//     }
//     catch(e){
//         res.status(500).send()
//     }
// })

router.get('/problemNameAndMachineID', async (req, res) => {
    try{
        const tags = req.query.problemDescription.split(' ')

        console.log(tags)
        
        const problem = await Problem.find({ machineID: req.query.machineID, tags: { $in: tags }})
 
        if(!problem){
            return res.status(404).send()
        }

        res.send(problem)
    }
    catch(e){
        res.status(500).send()
    }
})

//Update solutionList by machine ID
router.patch('/problems/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['solutionList']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try{
        const problem = await Problem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        
        if(!problem){
            return res.status(404).send()
        }

        res.send(problem)
    }
    catch(e){
        res.status(400).send(e)
    }
})

//Update solutionList by model no., problem description, and new solution
router.patch('/addSolution', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['solutionList']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    console.log("addSolution Method - Input values are =", req.query.modelNo +";"+ JSON.stringify(req.body.solutionList));

    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try{
        const problem = await Problem.findOneAndUpdate({ machineModelNo: req.query.modelNo, problemDescription: req.query.problem }, 
            { $push: { solutionList: req.body.solutionList } }, { new: true, runValidators: true })
        
        if(!problem){
            return res.status(404).send()
        }
        console.log(problem)
        res.send(problem)
    }
    catch(e){
        res.status(400).send(e)
    }
})

//Delete a problem and solutions
router.delete('/problems/:id', async (req, res) => {
    try{
        const problem = await Problem.findByIdAndDelete(req.params.id)
        
        if(!problem){
            return res.status(404).send()
        }

        res.send(problem)
    }
    catch(e){
        res.status(500).send()
    }
})

module.exports = router
