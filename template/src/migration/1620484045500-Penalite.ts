import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class Penalite1620484045500 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "Penalite",
            columns: [
                {
                    name: "IdPenalite",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "NomPenalite",
                    type: "varchar",
                },
                {
                    name: "DescriptionPenalite",
                    type: "varchar",
                },
               
                {
                    name: "MontantPenalite",
                    type: "float",
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
