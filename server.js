import { PrismaClient } from '@prisma/client'
import express from 'express'
import bodyParser from 'body-parser'

const prisma = new PrismaClient()

const PORT = 3033;
const HOST_NAME = "localhost";

const app = express()
app.use(express.static("client"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/all_artists_validated', async (req, res) => {
    const gets = await prisma.artists.findMany({
      where: { validated: true }
    })
    res.send(JSON.parse(JSON.stringify(gets, (key, value) =>
            typeof value === 'bigint'
                ? value.toString()
                : value // return everything else unchanged
        )));
})

app.get('/all_users', async (req, res) => {
    const gets = await prisma.users.findMany()
    res.send(JSON.parse(JSON.stringify(gets, (key, value) =>
            typeof value === 'bigint'
                ? value.toString()
                : value // return everything else unchanged
        )));
})

app.get('/', (req, res) => {
    res.send("Hello World");
})
  

app.listen(PORT, HOST_NAME, () => {
    console.log(`Server running at ${HOST_NAME}:${PORT}`)
});

async function main() {
    const allUsers = await prisma.users.findMany({
        where: {
            id: 1848,
        }
    })
}

main();