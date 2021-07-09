import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { Vehicule } from "../entity/Vehicule";
import { Borne } from "../entity/Borne";
import { Rental } from "../entity/Rental";
import { VehicleTracking } from "../entity/VehicleTracking";
import { VehiclePosition } from "../entity/VehiclePosition";


export const getVehicule = (req: Request, res: Response) => {
  Vehicule.findOne({ idVehicle: parseInt(req.params.idVehicule) })
    .then((vehicule: any) => {
      res.status(200).send(vehicule);
    })
    .catch((e) => {
      res.status(500).send({
        message: e.message,
      });
    });
};

export const getVehiculesByBorneId = async (req: Request, res: Response) => {
  try {
    const vehicles = await getConnection()
      .createQueryBuilder()
      .select("Vehicle")
      .from(Vehicule, "Vehicle")
      .where("Vehicle.idBorne = :id", { id: parseInt(req.params.idBorne) })
      .getMany();

    res.status(200).send(vehicles);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const addVehicule = async (req: Request, res: Response) => {
  const vehicule = Vehicule.create({
    registrationNumber: req.body.registrationNumber,
    unitPricePerHour: req.body.unitPricePerHour,
    unitPricePerDay: req.body.unitPricePerDay,
    vehicleType: req.body.vehicleType,
    vehiclebrand: req.body.vehiclebrand,
    vehiclemodel: req.body.vehiclemodel,
    fuelType: req.body.fuelType,
    idBorne: req.body.idBorne,
    vehicleColor: req.body.vehicleColor,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
  });

  vehicule
    .save()
    .then(() => {
      res.status(200).send(vehicule);
    })
    .catch((e) => {
      res.status(500).send({ message: e.message });
    });
};

export async function getVehicules(_req: Request, res: Response) {
  Vehicule.find()
    .then((vehicules) => {
      res.status(200).json(vehicules);
    })
    .catch((e) => {
      console.log(e)
      res.status(500).json({ message: e.message });
    });
}

export const updateVehicule = async (req: Request, res: Response) => {
  if (
    !req.body.registrationNumber ||
    !req.body.unitPricePerHour ||
    !req.body.unitPricePerDay ||
    !req.body.vehicleType ||
    !req.body.vehiclebrand ||
    !req.body.vehiclemodel ||
    !req.body.fuelType ||
    !req.body.idBorne ||
    !req.body.vehicleColor ||
    !req.body.longitude ||
    !req.body.latitude
  ) {
    return res.status(400).send({
      message: "Champs Vides",
    });
  }

  Vehicule.update(
    { idVehicle: parseInt(req.params.idVehicule) },
    {
      registrationNumber: req.body.registrationNumber,
      unitPricePerHour: req.body.unitPricePerHour,
      unitPricePerDay: req.body.unitPricePerDay,
      vehicleType: req.body.vehicleType,
      vehiclebrand: req.body.vehiclebrand,
      vehiclemodel: req.body.vehiclemodel,
      fuelType: req.body.fuelType,
      idBorne: req.body.idBorne,
      vehicleColor: req.body.vehicleColor,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
    }
  )
    .then((vehicule: any) => {
      return res.status(200).send(vehicule);
    })
    .catch((err: { kind: string }) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Vehicule non trouvé",
        });
      }

      return res.status(500).send({
        message: "Erreur Serveur",
      });
    });

  return null;
};

export const deleteVehicule = async (req: Request, res: Response) => {
  Vehicule.delete({ idVehicle: parseInt(req.params.idVehicule) })
    .then(() => {
      return res
        .status(200)
        .send({ message: "Vehicule supprimée avec succés!" });
    })
    .catch((err: { kind: string; name: string }) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Vehicule non trouvé",
        });
      }
      return res.status(500).send({
        message: "Erreur Serveur",
      });
    });
};

export const updateInfoVehicle = async (req: Request, res: Response) => {
  const idVehicle = parseInt(req.params.id);
  const { idBorne } = req.body;
  let borne: Borne
  let idBorneVar: number
  let rental
  let tracking

  try {
    // Update Borne Vehicle
    const vehicle = await Vehicule.findOneOrFail({ idVehicle })
    console.log("Here")
    if (idBorne == null) {
      throw "Id Borne Invalide"
    } else {
      // ASK ASMA IF N'incrémenté Le nombre de place f l borne la9dima
      idBorneVar = (vehicle.idBorne as unknown) as number;
      // Update Number of occupied places in the previous borne
      borne = await Borne.findOneOrFail({ idBorne: idBorneVar });
      borne.nbOccupiedPlaces--;
      await borne.save();

      // Update Vehicle Borne
      vehicle.idBorne = idBorne


      // Update Number of occupied places in the newest borne
      borne = await Borne.findOneOrFail({ idBorne })
      borne.nbOccupiedPlaces++;
      await borne.save();
    }

    // Update the Vehicle Position
    // Tell Asma That Rental Ou Vehicle Position fihom des données Marahoumsh Cohérente

    // 01- Get The last rental relative to that vehicule
    rental = await Rental.find({ idVehicle })
    const latestOne = new Date(Math.max.apply(null, rental.map(function (e) {
      return new Date(e.rentaldate);
    })));
    rental = await Rental.findOneOrFail({ idVehicle, rentaldate: latestOne })

    // 02- Access to Table Tracking & Get The last inserted tracking of that vehicle
    const position = await VehiclePosition.findOneOrFail({ idRental: rental.idRental })
    tracking = await VehicleTracking.find({ idPosition: position.idPosition })
    const lastTrack = Math.max.apply(null, tracking.map(function (e) {
      return e.idTrack;
    }))
    tracking = await VehicleTracking.findOneOrFail({ idTrack: lastTrack })

    // 03-use the tracking info( longitude & latitude) to update the position of the vehicle in vehicle table (longitude and latitude)
    vehicle.latitude = tracking.latitude
    vehicle.longitude = tracking.longitude
    await vehicle.save();

    return res.json(vehicle);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Something went wrong while updating vehicle borne..." });
  }
};

export const getRentalVehicle = async (req: Request, res: Response) => {
  const idVehicle = parseInt(req.params.id);
  let rental
  let tracking
  try {
    rental = await Rental.find({ idVehicle })
    const latestOne = new Date(Math.max.apply(null, rental.map(function (e) {
      return new Date(e.rentaldate);
    })));
    rental = await Rental.findOneOrFail({ idVehicle, rentaldate: latestOne })

    const position = await VehiclePosition.findOneOrFail({ idRental: rental.idRental })
    tracking = await VehicleTracking.find({ idPosition: position.idPosition })
    const lastTrack = Math.max.apply(null, tracking.map(function (e) {
      return e.idTrack;
    }))
    tracking = await VehicleTracking.findOneOrFail({ idTrack: lastTrack })

    return res.json(tracking);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Something went wrong while geting rental vehicle..." });
  }
};