import { Request, Response } from "express";
import { getManager} from "typeorm";
import { Vehicle } from "../entity/Vehicle";

export async function VehiculesRents(_req: Request, res: Response) {
    const qur = await getManager()
    .createQueryBuilder()
    .select(`vehicle."idVehicle" `)
    .addSelect(`count(rent."idVehicle") as "TotalRents"`)
    .from(Vehicle,"vehicle")
    .leftJoin("Rental", "rent", `rent."idVehicle" = vehicle."idVehicle"`)
    .groupBy(`vehicle."idVehicle"`)
    .getRawMany();
    res.json(qur);
}

export async function VehiculesRentsDate(_req: Request, res: Response) {
    const qur = await getManager()
    .createQueryBuilder()
    .select(`vehicle."idVehicle" `)
    .addSelect(`count(rent."idVehicle") as "TotalRents"`)
    .from(Vehicle,"vehicle")
    .leftJoin("Rental", "rent", `rent."idVehicle" = vehicle."idVehicle" AND "rentaldate" BETWEEN :start AND :end`,{start:_req.params.start, end:_req.params.end})
    .groupBy(`vehicle."idVehicle"`)
    .getRawMany();
    res.json(qur);
}

export async function VehiculesRentsYear(_req: Request, res: Response) {
    const qur = await getManager()
    .createQueryBuilder()
    .select(`vehicle."idVehicle" `)
    .addSelect(`count(rent."idVehicle") as "TotalRents"`)
    .from(Vehicle,"vehicle")
    .leftJoin("Rental", "rent", `rent."idVehicle" = vehicle."idVehicle" AND "rentaldate" BETWEEN :start AND :end`,{start: _req.params.year+"-01-01",end:_req.params.year+"-12-31"})
    .groupBy(`vehicle."idVehicle"`)
    .getRawMany();
    res.json(qur);
}

export async function VehiculesRentsYM(_req: Request, res: Response) {
    const qur = await getManager()
    .createQueryBuilder()
    .select(`vehicle."idVehicle" `)
    .addSelect(`count(rent."idVehicle") as "TotalRents"`)
    .from(Vehicle,"vehicle")
    .leftJoin("Rental", "rent", `rent."idVehicle" = vehicle."idVehicle" AND "rentaldate" BETWEEN :start AND :end`,{start: _req.params.year+"-"+_req.params.month+"-01",end:_req.params.year+"-"+(parseInt(_req.params.month)+1)+"-01"})
    .groupBy(`vehicle."idVehicle"`)
    .getRawMany();
    res.json(qur);
}

export async function VehiculesRentsYMD(_req: Request, res: Response) {
    const qur = await getManager()
    .createQueryBuilder()
    .select(`vehicle."idVehicle" `)
    .addSelect(`count(rent."idVehicle") as "TotalRents"`)
    .from(Vehicle,"vehicle")
    .leftJoin("Rental", "rent", `rent."idVehicle" = vehicle."idVehicle" AND "rentaldate"=:date`,{date: _req.params.year+"-"+_req.params.month+"-"+_req.params.day})
    .groupBy(`vehicle."idVehicle"`)
    .getRawMany();
    res.json(qur);
}

export async function VehiculeRents(_req: Request, res: Response) {
    const qur = await getManager()
    .createQueryBuilder()
    .select(`vehicle."idVehicle" `)
    .addSelect(`count(rent."idVehicle") as "TotalRents"`)
    .from(Vehicle,"vehicle")
    .leftJoin("Rental", "rent", `rent."idVehicle" = vehicle."idVehicle"`)
    .where(`vehicle."idVehicle"=:id`,{id: _req.params.id})
    .groupBy(`vehicle."idVehicle"`)
    .getRawOne();
    res.json(qur);
}

export async function VehiculeRentsDate(_req: Request, res: Response) {
    const qur = await getManager()
    .createQueryBuilder()
    .select(`vehicle."idVehicle" `)
    .addSelect(`count(rent."idVehicle") as "TotalRents"`)
    .from(Vehicle,"vehicle")
    .leftJoin("Rental", "rent", `rent."idVehicle" = vehicle."idVehicle" AND "rentaldate" BETWEEN :start AND :end`,{start:_req.params.start, end:_req.params.end})
    .where(`vehicle."idVehicle"=:id`,{id: _req.params.id})
    .groupBy(`vehicle."idVehicle"`)
    .getRawOne();
    res.json(qur);
}

export async function VehiculeRentsYear(_req: Request, res: Response) {
    const qur = await getManager()
    .createQueryBuilder()
    .select(`vehicle."idVehicle" `)
    .addSelect(`count(rent."idVehicle") as "TotalRents"`)
    .from(Vehicle,"vehicle")
    .leftJoin("Rental", "rent", `rent."idVehicle" = vehicle."idVehicle" AND "rentaldate" BETWEEN :start AND :end`,{start: _req.params.year+"-01-01",end:_req.params.year+"-12-31"})
    .where(`vehicle."idVehicle"=:id`,{id: _req.params.id})
    .groupBy(`vehicle."idVehicle"`)
    .getRawOne();
    res.json(qur);
}

export async function VehiculeRentsYM(_req: Request, res: Response) {
    const qur = await getManager()
    .createQueryBuilder()
    .select(`vehicle."idVehicle" `)
    .addSelect(`count(rent."idVehicle") as "TotalRents"`)
    .from(Vehicle,"vehicle")
    .leftJoin("Rental", "rent", `rent."idVehicle" = vehicle."idVehicle" AND "rentaldate" BETWEEN :start AND :end`,{start: _req.params.year+"-"+_req.params.month+"-01",end:_req.params.year+"-"+(parseInt(_req.params.month)+1)+"-01"})
    .where(`vehicle."idVehicle"=:id`,{id: _req.params.id})
    .groupBy(`vehicle."idVehicle"`)
    .getRawOne();
    res.json(qur);
}

export async function VehiculeRentsYMD(_req: Request, res: Response) {
    const qur = await getManager()
    .createQueryBuilder()
    .select(`vehicle."idVehicle" `)
    .addSelect(`count(rent."idVehicle") as "TotalRents"`)
    .from(Vehicle,"vehicle")
    .leftJoin("Rental", "rent", `rent."idVehicle" = vehicle."idVehicle" AND "rentaldate"=:date`,{date: _req.params.year+"-"+_req.params.month+"-"+_req.params.day})
    .where(`vehicle."idVehicle"=:id`,{id: _req.params.id})
    .groupBy(`vehicle."idVehicle"`)
    .getRawOne();
    res.json(qur);
}


export async function signalEnlev(_req: Request, res: Response) {
    const qur = await getManager()
    .createQueryBuilder()
    .select(`vehicle."idVehicle" `)
    .addSelect(`count(signal."idVehicle") as "TotalSignals"`)
    .from(Vehicle,"vehicle")
    .leftJoin("Signal", "signal", `signal."idVehicle" = vehicle."idVehicle" AND "signalType"=:type`,{type:"theft"})
    .groupBy(`vehicle."idVehicle"`)
    .getRawMany();
    res.json(qur);
}

export async function signalEnlevById(_req: Request, res: Response) {
    const qur = await getManager()
    .createQueryBuilder()
    .select(`vehicle."idVehicle" `)
    .addSelect(`count(signal."idVehicle") as "TotalSignals"`)
    .from(Vehicle,"vehicle")
    .leftJoin("Signal", "signal", `signal."idVehicle" = vehicle."idVehicle" AND "signalType"=:type`,{type:"theft"})
    .where(`vehicle."idVehicle"=:id`,{id: _req.params.id})
    .groupBy(`vehicle."idVehicle"`)
    .getRawOne();
    res.json(qur);
}
