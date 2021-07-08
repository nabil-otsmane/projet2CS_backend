import axios, * as axois from 'axios'

const url = `http://${process.env.LOG_SERVICE}`;
console.log("log service is: " + url)

export default function log(message: string, isError: boolean) {
    let appId = getApp()
    let body = {
        details: message,
        date: Date.now(),
        app: appId
    }
    if (isError) {
        let body2 = {...body, error: message};
        // axios.post(`${url}/log`, body2)
    } else {
        // axios.post(`${url}/log`, body)
    }
}

async function getApp() {
    try {
        let apps = await axios.get(`${url}/app`)
        let thisApp = apps.data.filter((e: any) => e.nomApp === process.env.NAME)
        if (thisApp.length === 0) {
            let app = await axios.post(`${url}/app`, {
                nom: process.env.NAME,
                taux: 0.0
            })

            return app.data.id
        } else {
            return thisApp[0].id
        }

    } catch (e) {
        console.log(e.message)
    }
    return 0

}