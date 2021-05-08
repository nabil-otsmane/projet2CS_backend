import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class CarteAbonnement1620484519500 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "CarteAbonnement",
            columns: [
                {
                    name: "IdCarteAbonnement",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "NumCarteAbonnement",
                    type: "int",
                },
                {
                    name: "TypeAbonnement",
                    type: "varchar",
                },
                {
                    name: "TauxReduction",
                    type: "float",
                },
                {
                    name: "Parametre",
                    type: "varchar",
                },
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
