import { Request, Response } from "express";
import { VehiclePosition } from "../entity/VehiclePosition";
import { VehicleTracking } from "../entity/VehicleTracking";

export const get =  (_req: Request, res: Response) => {
    res.end("geolocation service is up and running!");
}

/**
 * Retourne le trajet d'un véhicule pour une location donnée
 * @param req Requête HTTP contenant l'identifiant de la location
 * @param res Réponse JSON contenant la liste des latitudes et longitudes
 */
export async function getVehiclePosition(req: any, res: Response) {
    const position = await VehiclePosition.findOne({  
        where: { idRental: req.query.idRental },
        relations: ["trajet"]
    });
    res.json({
        ok: true,
        route: position?.trajet
    })
}

/**
 * Retourne la dernière position d'un véhicule pour une location donnée
 * @param req Requête HTTP contenant l'identifiant de la location
 * @param res Réponse JSON contenant la latitude et longitude
 */
export async function getVehicleLatestPosition(req: any, res: Response) {
    const position = await VehiclePosition.findOne({  
        where: { idRental: req.query.idRental }
    });
    const tracking = await VehicleTracking.findOne({
        where: { idPosition: position?.idPosition },
        order: { created_at: "DESC" }
    });
    res.json({
        ok: true,
        position: [tracking?.longitude, tracking?.latitude]
    })
}

