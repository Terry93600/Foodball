const express = require("express")
const app = express()
const cors = require("cors"); 

require('dotenv').config()

const roleRouter = require('./routes/roleRouter')
const typeEventRouter = require('./routes/typeEventRouter')
const teamRouter = require('./routes/teamRouter')
const userRouter = require('./routes/userRouter')
const restaurantRouter = require('./routes/restaurantRouter')
const eventrouter = require('./routes/eventRouter')
const restaurantEventRouter = require('./routes/restaurantEventRouter')
const menuRouter = require('./routes/menuRouter')
const platRouter = require('./routes/platRouter')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173"
}))


app.use("/api/role", roleRouter)
app.use("/api/typeEvent", typeEventRouter)
app.use("/api/menu", menuRouter)
app.use("/api/plat", platRouter)
app.use("/api/team", teamRouter)
app.use("/api/user", userRouter)
app.use("/api/restaurant", restaurantRouter)
app.use("/api/event", eventrouter)
app.use("/api/restaurantEvent", restaurantEventRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("Server ....")
})