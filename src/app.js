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
        return res.status(400).send("Todos os campos são obrigatórios!")
    }

    if((typeof username !== "string") || (typeof tweet !== "string")){
        return res.status(400).send("Todos os campos são obrigatórios!")
    }
    
    const tweetDeploy = {username, tweet}

    tweets.push(tweetDeploy)
    res.status(201).send("OK")
})

app.get("/tweets", (req, res) => {
    const tweetSend = tweets.map((tweet) =>{
        const u = user.find((u) => u.username === tweet.username)
        return {...tweet, avatar: u.avatar}
    })
    const reverseOrderTweets = tweetSend.reverse()
        
    const lastTenTweets = reverseOrderTweets.slice(0, 10)
    
    res.send(lastTenTweets)
})

app.listen(5000)