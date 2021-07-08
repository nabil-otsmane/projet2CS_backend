import { RedisClient } from "redis"
import { Socket } from "socket.io";
import { getRepository } from "typeorm";
import { Locataire } from "../entity/Locataire";
import { Vehicule } from "../entity/Vehicule";
import measureDistance from "../lib/measurement"
import axios from "axios"

interface VehiculeData {
    id: number,
}


interface ILocataire {
    id: number,
    nom: string,
}

interface AssociationData {
    locataire: ILocataire,
    idVehicule: number
}



function measureDistance(lat1: number, lon1: number, lat2: number, lon2: number) {  // generally used geo measurement function
    var R = 6378.137; // Radius of earth in KM
    var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d * 1000; // meters
}

export const connect = function (this: Socket, redis: RedisClient) {

    return async ({ id }: VehiculeData) => {
interface ILocataire {
    id: number,
    nom: string,
}

interface AssociationData {
    locataire: ILocataire,
    idVehicule: number
}

export const connect = function (this: Socket, redis: RedisClient) {
    
    return async ({id}: VehiculeData) => {

        redis.smembers("vehicules", (_err, vehi) => {
            for (let i of vehi) {
                let vehicule = JSON.parse(i)
                if (id === vehicule.id)
                    redis.srem("vehicules", i)
            }
        })
        try {
            let vehicule = await Vehicule.find({ where: { idVehicle: id } });

            if (vehicule.length === 0) {
                console.log("[association] connection error, cannot find vehicule of id " + id);
                this.emit("error", { message: "Couldn't connect: Invalid id" });
            } else {
                let payload = { id, socketId: this.id };
                console.log("connected vehicule of id: " + id + " using socketId: " + this.id);
                redis.sadd("vehicules", JSON.stringify(payload));

                this.emit("connected");
            }
        } catch (err) {
            this.emit("error", { message: err.message })
        }
    }
}

async function areClose(idVehicle: number, idLocataire: number): Promise<boolean> {
    let vehicule = await Vehicule.find({ where: { idVehicle } });
    let locataire = await Locataire.find({ where: { idUser: idLocataire } });

    if (vehicule.length === 0 || locataire.length === 0)
        return true;

    return true // measureDistance(vehicule[0].latitude, vehicule[0].longitude, locataire[0].latitude, locataire[0].longitude) <= 50;
}

export const openConnection = function (this: Socket, redis: RedisClient) {

    return ({ locataire, idVehicule }: AssociationData) => {

        console.log(idVehicule)
        redis.smembers("vehicules", async (err, vehicules) => {

            if (err) {
                console.log("[association]: open vehicule error, " + err.message);
            } else {
                let isRegistered = false;
                let id = null;
                for (let i of vehicules) {
                    let vehicule = JSON.parse(i);
                    if (vehicule.id === idVehicule) {
                        isRegistered = true;
                        id = vehicule.socketId;
                        break;
                    }
                }

                if (isRegistered) {
                    if (await areClose(idVehicule, locataire.id)) {
                        redis.sadd("connections", JSON.stringify({ idLocataire: locataire.id, idVehicule }));
                        this.emit("link started")
                        this.broadcast.to(id).emit("start link", { nomLocataire: locataire.nom });
                        console.log("trying to connect " + locataire.id + " with vehicule " + idVehicule)
                    }
                }
                else {
                    this.emit("link failed", { message: "vehicule not found." })
                }
            }

        })
    }
}

export const closeConnection = function (this: Socket, redis: RedisClient) {
    return ({ idLocataire }: any) => {
        redis.smembers("connections", (_err, connections) => {
            for (let i of connections) {
                let connection = JSON.parse(i)

                if (connection.idLocataire === idLocataire) {
                    let { idVehicule } = connection
                    getRepository("Vehicle").update({ idVehicle: idVehicule }, { availibility: "available" })

                    axios.get("http://" + process.env.LOCATION_SERVICE + "/updateVehicle?idVehicle=" + idVehicule)
                        .then(() => {
                            redis.srem("connections", i, (_err) => {
                                console.log("error while removing location.")
                            });
                        })
                        .catch(err => {
                            console.log(err)
                        })

                }
            }
        })
    }
}

export const disconnect = function (this: Socket, redis: RedisClient) {

    return async () => {
        redis.smembers("vehicules", (err, members) => {
            if (err) {
                console.log("[association]: vehicule disconnect error, " + err.message);
            } else {
                for (let i of members) {
                    let member = JSON.parse(i);
                    if (member.socketId === this.id) {
                        console.log("disconnected vehicule of id: " + this.id);
                        redis.srem("vehicules", i);
                    }
                }
            }
        });
    }
}
