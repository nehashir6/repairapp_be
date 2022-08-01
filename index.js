const express = require('express')
require('./db/mongoose')
const peopleRouter = require('./routers/people')
const supplierRouter = require('./routers/suppliers')
const contractorRouter = require('./routers/contractors')
const machineRouter = require('./routers/machines')
const problemRouter = require('./routers/problems')

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(peopleRouter)
app.use(supplierRouter)
app.use(contractorRouter)
app.use(machineRouter)
app.use(problemRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
