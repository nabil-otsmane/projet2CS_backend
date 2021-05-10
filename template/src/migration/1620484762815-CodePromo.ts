import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class CodePromo1620484762815 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "CodePromo",
            columns: [
                {
                    name: "IdCodePromo",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "PrixPoints",
                    type: "float",
                },
                {
                    name: "TauxReduction",
                    type: "float",
                }, 
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("CodePromo");

    }

}
