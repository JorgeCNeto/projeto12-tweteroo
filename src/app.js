import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

const user = []
const tweets = []

app.post("/sign-up", (req, res) => {
    const { username, avatar} = req.body

    if(!username || !avatar){
        return res.sendStatus(400)
    }

    if((typeof username !== "string") || (typeof avatar !== "string")){
        return res.status(400).send("Todos os campos são obrigatórios!")
    }

    const newUser = {username, avatar}

    user.push(newUser)
    res.status(201).send("OK")
})

app.post("/tweets", (req, res) => {
    
    const { username, tweet } = req.body

    const userVerify = user.find(u => u.username === username)
    
    if(!userVerify){
        return res.status(401).send("UNAUTHORIZED")
    }

    if(!username || !tweet){
        return res.sendStatus(400)
    }

    if((typeof username !== "string") || (typeof tweet !== "string")){
        return res.status(400).send("Todos os campos são obrigatórios!")
    }
    
    const tweetDeploy = {username, tweet}

    tweets.push(tweetDeploy)
    res.status(201).send("OK")
})

app.get("/tweets", (req, res) => {
    const {username, avatar, tweet} = req.params

    if(tweets === ""){
        return res.send([])
    }

    const tenTweets = []

    for(let i = tweets.length - 1; i > tweets.length - 11; i--){
        tenTweets.push(tweets)
    }
    
    res.send(tenTweets)
})

app.listen(5000)