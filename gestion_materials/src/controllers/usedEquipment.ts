import { Request, Response } from "express";
import { Equipment } from "../entity/Equipment";
import { UsedEquipment } from "../entity/UsedEquipment";
import { validate } from "class-validator";
import { Task } from "../entity/Task";

/**
 * Create new UsedEquipment request.
 *
 * @param _req - The request to the create an used Equipment
 * @param res - The response to the request
 *
 */
export const addUsedEquip = async (req: Request, res: Response) => {
  const { equipment, description, quantity, taskUUID } = req.body;

  try {
    const equip = await Equipment.findOneOrFail({ uuid: equipment });
    const task = await Task.findOneOrFail({ uuid: taskUUID });

    const usedEquip = UsedEquipment.create({
      description,
      quantity,
      equipment: equip,
      task: task,
    });

    const errors = await validate(usedEquip);
    if (errors.length > 0) throw errors;

    await usedEquip.save();
    return res.send(usedEquip);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

/**
 * Get all used Equipments request.
 *
 * @param _req - The request to get all used materials.
 * @param res - The response to the request.
 *
 */
export async function getUsedEquips(_req: Request, res: Response) {
  try {
    const usedEquips = await UsedEquipment.find({ relations: ["equipment"] });
    console.log("Hello !");

    console.log(usedEquips);
    return res.json(usedEquips);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

/**
 * Update used Equipment request.
 *
 * @param _req - The request to update an used Equipment with parameter.
 * @param res - The response to the request.
 *
 */
export async function updateUsedEquip(req: Request, res: Response) {
  const uuid = req.params.uuid;
  const { description, quantity } = req.body;

  try {
    const usedEquip = await UsedEquipment.findOneOrFail({ uuid });
    console.log("CouCou Here !");

    usedEquip.description = description || usedEquip.description;
    usedEquip.quantity = quantity || usedEquip.quantity;

    await usedEquip.save();

    return res.json(usedEquip);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Something went wrong while updating ..." });
  }
}

/**
 * Delete a used material request.
 *
 * @param _req - The request to update a used material with parameter.
 * @param res - The response to the request.
 *
 */
export async function deleteUsedEquip(req: Request, res: Response) {
  const uuid = req.params.uuid;
  const errorMsg = { message: "Equipment supprimée avec succès" };
  try {
    const usedEquip = await UsedEquipment.findOneOrFail({ uuid });
    await usedEquip.remove();
    return res.status(204).json(errorMsg);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: " Something went wrong while deleting ..." });
  }
}

/**
 * Find a used Equipment request by id.
 *
 * @param _req - The request to find a used Equipment with parameter (EquipmentID).
 * @param res - The response to the request.
 *
 */
export async function getUsedEquip(req: Request, res: Response) {
  try {
    const uuid = req.params.uuid;
    const usedEquip = await UsedEquipment.findOneOrFail(
      { uuid },
      { relations: ["equipment"] }
    );
    return res.send(usedEquip);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Material introuvable" });
  }
}
