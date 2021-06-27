import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class Location1620485518678 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "Location",
            columns: [
                {
                    name: "IdLocation",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "IdLocataire",
                    type: "int",
                },
                {
                    name: "IdVehicule",
                    type: "int",
                },
                {
                    name: "DateLocation",
                    type: "Date",
                },
                {
                    name: "HeureLocation",
                    type: "timestamp",
                },
                {
                    name: "DateLocationPrevu",
                    type: "Date",
                },
                {
                    name: "HeureLocationPrevu",
                    type: "timestamp",
                },
                {
                    name: "DateLocationActuelle",
                    type: "Date",
                },
                {
                    name: "HeureLocationActuelle",
                    type: "timestamp",
                },
                {
                    name: "TypeLocation",
                    type: "varchar",
                },
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable("Location");

    }

}
