import { Request, Response } from "express";
import { Borne } from "../entity/Borne";
import { Rental } from "../entity/Rental";
import { Vehicle } from '../entity/Vehicle'
import { VehiclePosition } from "../entity/VehiclePosition";
import { VehicleTracking } from "../entity/VehicleTracking";

export const get = (_req: Request, res: Response) => {
  res.end("Pricing service.");
}

export const addRental = async (req: Request, res: Response) => {
  try {
    const rental = Rental.create({
      idTenant: req.body.idTenant,
      idVehicle: req.body.idVehicle,
      rentaldate: req.body.rentaldate,
      rentaltime: req.body.rentaltime,
      plannedrestitutiondate: req.body.plannedrestitutiondate,
      plannedrestitutiontime: req.body.plannedrestitutiontime,
      restitutionDate: req.body.restitutionDate,
      restitutionTime: req.body.restitutionTime,
      rentalType: req.body.rentalType,
      iddepartborne: req.body.iddepartborne,
      iddestborne: req.body.iddestborne,
      rentalstate: req.body.rentalstate
    })
    await rental.save()
    console.log(rental)
    res.status(200).send(rental)
  } catch (e) {
    res.status(500).send(e)
  }
}

export async function getRentals(_req: Request, res: Response) {
  console.log('hereee');
  const rentals = await Rental.find();
  res.json(rentals)
}

export async function getRentalById(_req: Request, res: Response) {
  const id = _req.params.id;
  const rental = await Rental.findOne(id);
  res.json(rental)
}

export async function getRentalsByState(_req: Request, res: Response) {
  const state = _req.params.state;
  const rental = await Rental.findOne({ where: { rentalstate: state } });
  res.json(rental)
}

export async function updateRental(_req: Request, res: Response) {
  const id = _req.params.id;
  const rental = await Rental.findOne(id);
  if (rental) {
    Rental.merge(rental, _req.body);
    const result = Rental.save(rental);
    res.json(result);
  }
  else {
    res.json({ msg: "Rental Not Found" });
  }

}

export async function deleteRental(_req: Request, res: Response) {
  const id = _req.params.id;
  const rental = await Rental.delete(id);
  res.json(rental)
}


export async function updateVehicleState(req: Request, res: Response) {
  const idV = req.params.idVehicle;
  try {
    const vehicle = await Vehicle.findOneOrFail(idV)
    vehicle.availibility = "allocated";
    const rental = await Rental.findOneOrFail({
      where: [{
        idVehicle: idV
      },
      {
        rentalstate: 'active'
      }]
    })

    rental.rentalstate='paid'
    await rental.save();
    await vehicle.save();
    return res.json({
      vehicle : vehicle,
      rental : rental
    });
  }
  catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Something went wrong while updating ..." });
  }
}

export async function endRental(req: Request, res: Response) {
 /* const vehicle = await Vehicle.findOne(req.params.idVehicle)
  if (vehicle) {
    if (vehicle.availibility.toLocaleLowerCase() == 'allocated') {
      const rental = await Rental.findOne({
        where: [{
          idVehicle: req.params.idVehicle
        },
        {
          rentalstate: 'paid'
        }]
      })

      if (rental) {
        rental.rentalstate = 'archived'
        var saveRental = await Rental.save(rental)

        if (saveRental) {
          vehicle.availibility = 'available'
          var saveVehicle = await Vehicle.save(vehicle)
          if (saveVehicle) {
              res.json("success")
          } else {
            res.json("Error saving vehicle state")
          }
        } else {
          res.json("Error saving rental state")
        }

      } else {
        res.json("No active rental associated with this vehicle")
      }
    } else {
      res.json("Vehicle is " + vehicle.availibility)
    }
  } else {
    res.json("Vehicle doesn't exist")
  }*/
  const idVehicle = parseInt(req.params.idVehicle);
  const { idBorne } = req.body;
  console.log(idBorne)
  let borne: Borne
  let idBorneVar: number
  let rental
  let tracking

  try {
    const vehicle = await Vehicle.findOneOrFail({idVehicle})
    console.log(vehicle)
    // Update Borne Vehicle
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
    if(vehicle.availibility.toLocaleLowerCase()=='allocated'){

      if(rental){
          rental.rentalstate='archived'
          var saveRental = await Rental.save(rental)

          if(saveRental){
            vehicle.availibility='available'
            var saveVehicle = await Vehicle.save(vehicle)
            if(saveVehicle){
                 return res.json("success")
            }else{
              return res.status(505).json("Error saving vehicle state")
            }
          }else{
            return res.status(505).json("Error saving rental state")
          }

      }else{
        return res.status(404).json("No active rental associated with this vehicle")
      }
    }else{
      return res.status(404).json("Vehicle is " + vehicle.availibility)
    }
    
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Something went wrong while updating vehicle borne..." });
}
}
