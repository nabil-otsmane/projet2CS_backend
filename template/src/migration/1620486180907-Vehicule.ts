import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class Vehicule1620486180907 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "Vehicule",
            columns: [
                {
                    name: "IdVehicule",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "CategorieVehicule",
                    type: "varchar",
                },
                {
                    name: "MarqueVehicule",
                    type: "varchar",
                },
                {
                    name: "ModeleVehicule",
                    type: "varchar",
                },
                {
                    name: "TypeCarburant",
                    type: "varchar",
                },
                {
                    name: "PrixUnitaireHeure",
                    type: "float",
                },
                {
                    name: "PrixUnitaireJour",
                    type: "float",
                },
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("Vehicule");

    }

}
