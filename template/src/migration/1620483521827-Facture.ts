import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class Facture1620483521827 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "Facture",
            columns: [
                {
                    name: "IdFacture",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "NumeroFacture",
                    type: "int",
                },
                {
                    name: "IdLocation",
                    type: "int",
                },
                {
                    name: "dateCreation",
                    type: "Date",
                },
                {
                    name: "TarifDeBase",
                    type: "float",
                },
                {
                    name: "TarifPenalite",
                    type: "float",
                },
                {
                    name: "TarifTotal",
                    type: "float",
                },
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("Facture");

    }
    

}
