import { Request, Response } from "express";
import { getManager} from "typeorm";



export async function CarRentsByDay(_req: Request, res: Response) {
    const qur = await getManager()
    .createQueryBuilder()
    .select(`*`)
    .from(`( SELECT h.day,h."idVehicle" as id ,count(r."rentaldate") as rents FROM ((SELECT generate_series(
        date_trunc('year', now()),
        now(),
        '1 day'
        )::DATE AS day ) g cross join "Vehicle" v ) h 
        LEFT JOIN "Rental" r on r."idVehicle"=h."idVehicle" and r."rentaldate"=h.day
        group by h.day,h."idVehicle"
        order by h.day)`,"V")
    .where(`"V".id=:id`,{id: _req.params.id})
    .getRawMany();
    res.json(qur);
}

export async function CarRentsByMonth(_req: Request, res: Response) {
    const qur = await getManager()
    .createQueryBuilder()
    .select(`*`)
    .from(`(SELECT h.month,h."idVehicle" as id ,count(r."rentaldate") as rents FROM ((SELECT TO_CHAR(generate_series(
        date_trunc('year', now()),
        now(),
        '1 month'
        ),'Mon') as month ) g cross join "Vehicle" v ) h 
        LEFT JOIN "Rental" r on r."idVehicle"=h."idVehicle" and TO_CHAR(r."rentaldate",'Mon')=h.month
        group by h.month,h."idVehicle"
        order by to_date(h.month,'Mon'))`,"V")
    .where(`"V".id=:id`,{id: _req.params.id})
    .getRawMany();
    res.json(qur);
}

export async function CarRentsByYear(_req: Request, res: Response) {
    const qur = await getManager()
    .createQueryBuilder()
    .select(`*`)
    .from(`(SELECT h.year,h."idVehicle" as id ,count(r."rentaldate") as rents FROM ((SELECT EXTRACT(YEAR FROM 
        generate_series(
        now() - INTERVAL '5 years',
        now(),
        '1 year'
        )) as year ) g cross join "Vehicle" v ) h 
        LEFT JOIN "Rental" r on r."idVehicle"=h."idVehicle" and extract(year from r."rentaldate")=h.year
        group by h.year,h."idVehicle"
        order by h.year)`,"V")
    .where(`"V".id=:id`,{id: _req.params.id})
    .getRawMany();
    res.json(qur);
}


