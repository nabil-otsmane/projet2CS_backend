import { User } from '../entity'
export const authToken = async (req: any, res: any, next: Function) => {
    const user = await User.findOne({ where: { id: 35 } })
    if (user) {
        req.user = user;
        return next()
    } else {
        res.status(401).send({
            ok: false,
            errors: "Authentification required"
        })
    }

}