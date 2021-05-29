import { Request, Response } from "express";
import { Equipment } from "../entity/Equipment";
import { Task } from "../entity/Task";
/**
 * Welcome endpoint for task management service.
 *
 * @remarks
 * This method is for service testing, it returns a welcome message.
 *
 * @param _req - The request to the service
 * @param res - The response to the request
 *
 */
export const get = (_req: Request, res: Response) => {
  res.send("<h1> Welcome To Material Service 🤝 </h1>");
};

/**
 * Create new Equipment request.
 *
 * @param _req - The request to the create an Equipment
 * @param res - The response to the request
 *
 */
export const addEquip = async (req: Request, res: Response) => {
  const { equipmentName, category, unitPrice } = req.body;
  try {
    const equip = Equipment.create({
      equipmentName,
      unitPrice,
      category,
    });

    await equip.save();
    return res.send(equip);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

/**
 * Get all Equipments request.
 *
 * @param _req - The request to get all materials.
 * @param res - The response to the request.
 *
 */
export async function getEquips(_req: Request, res: Response) {
  try {
    const Equips = await Equipment.find({ relations: ["usedEquipments"] });
    console.log(Equips);
    return res.json(Equips);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

/**
 * Update Equipment request.
 *
 * @param _req - The request to update an Equipment with parameter.
 * @param res - The response to the request.
 *
 */
export async function updateEquip(req: Request, res: Response) {
  const uuid = req.params.uuid;
  const { equipmentName, category, unitPrice } = req.body;

  try {
    const equip = await Equipment.findOneOrFail({ uuid });
    console.log("CouCou Here !");

    equip.equipmentName = equipmentName || equip.equipmentName;
    equip.category = category || equip.category;
    equip.unitPrice = unitPrice || equip.unitPrice;

    await equip.save();

    return res.json(equip);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Something went wrong while updating ..." });
  }
}

/**
 * Delete a material request.
 *
 * @param _req - The request to update a material with parameter.
 * @param res - The response to the request.
 *
 */
export async function deleteEquip(req: Request, res: Response) {
  const uuid = req.params.uuid;
  const errorMsg = { message: "Equipment supprimée avec succès" };
  try {
    const equip = await Equipment.findOneOrFail({ uuid });
    await equip.remove();
    return res.status(204).json(errorMsg);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: " Something went wrong while deleting ..." });
  }
}

/**
 * Find an Equipment request by id.
 *
 * @param _req - The request to find an Equipment with parameter (EquipmentID).
 * @param res - The response to the request.
 *
 */
export async function getEquip(req: Request, res: Response) {
  const uuid = req.params.uuid;
  try {
    const equip = await Equipment.findOneOrFail({ uuid });
    return res.send(equip);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Material introuvable" });
  }
}
