import { Request, Response } from "express";
import { getManager} from "typeorm";
import { Borne } from "../entity/Borne";

export async function BornesRents(_req: Request, res: Response) {
    const qur = await getManager()
    .createQueryBuilder()
    .select(`Borne."idBorne" `)
    .addSelect(`count(rent."idDepartBorne") as "TotalRents"`)
    .from(Borne,"borne")
    .leftJoin("Rental", "rent", `rent."idDepartBorne" = Borne."idBorne"`)
    .groupBy(`Borne."idBorne"`)
    .getRawMany();
    res.json(qur);
}

export async function BornesRentsDate(_req: Request, res: Response) {
    const qur = await getManager()
    .createQueryBuilder()
    .select(`Borne."idBorne" `)
    .addSelect(`count(rent."idDepartBorne") as "TotalRents"`)
    .from(Borne,"borne")
    .leftJoin("Rental", "rent", `rent."idDepartBorne" = Borne."idBorne"AND "rentaldate" BETWEEN :start AND :end`,{start:_req.params.start, end:_req.params.end})
    .groupBy(`Borne."idBorne"`)
    .getRawMany();
    res.json(qur);
}

export async function BornesRentsById(_req: Request, res: Response) {
    const qur = await getManager()
    .createQueryBuilder()
    .select(`Borne."idBorne" `)
    .addSelect(`count(rent."idDepartBorne") as "TotalRents"`)
    .from(Borne,"borne")
    .leftJoin("Rental", "rent", `rent."idDepartBorne" = Borne."idBorne"`)
    .where(`borne."idBorne"=:id`,{id: _req.params.id})
    .groupBy(`Borne."idBorne"`)
    .getRawOne();
    res.json(qur);
}

export async function BornesRentsDateById(_req: Request, res: Response) {
    const qur = await getManager()
    .createQueryBuilder()
    .select(`Borne."idBorne" `)
    .addSelect(`count(rent."idDepartBorne") as "TotalRents"`)
    .from(Borne,"borne")
    .leftJoin("Rental", "rent", `rent."idDepartBorne" = Borne."idBorne"AND "rentaldate" BETWEEN :start AND :end`,{start:_req.params.start, end:_req.params.end})
    .where(`borne."idBorne"=:id`,{id: _req.params.id})
    .groupBy(`Borne."idBorne"`)
    .getRawOne();
    res.json(qur);
}