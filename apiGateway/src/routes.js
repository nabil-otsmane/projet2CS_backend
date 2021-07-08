const { Router } = require("express")
const proxy = require("express-http-proxy")

const services = require("./constants")

const router = Router()

for (let i in services) {
    router.use(`/${i}`, proxy(services[i]))
}

module.exports = router