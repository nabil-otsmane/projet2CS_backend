import { Request, Response } from "express";
import { getManager} from "typeorm";
import { Agent } from "../entity/Agent";

export async function AgentReparation(_req: Request, res: Response) {
    const qur = await getManager()
    .createQueryBuilder()
    .select(`"idAgent" `)
    .addSelect(`count("idAgentTreatPanne") as "Reparation"`)
    .from(Agent,"agent")
    .leftJoin("Panne", "panne", `panne."idAgentTreatPanne" = agent."idAgent"`)
    .groupBy(`"idAgent"`)
    .getRawMany();
    res.json(qur);
}

export async function AgentReparationDate(_req: Request, res: Response) {
    const qur = await getManager()
    .createQueryBuilder()
    .select(`"idAgent" `)
    .addSelect(`count("idAgentTreatPanne") as "Reparation"`)
    .from(Agent,"agent")
    .leftJoin("Panne", "panne", `panne."idAgentTreatPanne" = agent."idAgent" AND panne."dateReparationPanne" BETWEEN :start AND :end`,{start:_req.params.start, end:_req.params.end})
    .groupBy(`"idAgent"`)
    .getRawMany();
    res.json(qur);
}



export async function AgentReparationById(_req: Request, res: Response) {
    const qur = await getManager()
    .createQueryBuilder()
    .select(`"idAgent" `)
    .addSelect(`count("idAgentTreatPanne") as "Reparation"`)
    .from(Agent,"agent")
    .leftJoin("Panne", "panne", `panne."idAgentTreatPanne" = agent."idAgent"`)
    .where(`"idAgent"=:id`,{id: _req.params.id})
    .groupBy(`"idAgent"`)
    .getRawOne();
    res.json(qur);
}

export async function AgentReparationDateById(_req: Request, res: Response) {
    const qur = await getManager()
    .createQueryBuilder()
    .select(`"idAgent" `)
    .addSelect(`count("idAgentTreatPanne") as "Reparation"`)
    .from(Agent,"agent")
    .leftJoin("Panne", "panne", `panne."idAgentTreatPanne" = agent."idAgent" AND panne."dateReparationPanne" BETWEEN :start AND :end`,{start:_req.params.start, end:_req.params.end})
    .where(`"idAgent"=:id`,{id: _req.params.id})
    .groupBy(`"idAgent"`)
    .getRawMany();
    res.json(qur);
}


