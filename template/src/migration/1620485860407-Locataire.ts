import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class Locataire1620485860407 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.createTable(new Table({
                name: "Locataire",
                columns: [
                    {
                        name: "IdUtilisateur",
                        type: "int",
                        isPrimary: true
                    },
                    {
                        name: "Nom",
                        type: "varchar",
                    },
                    {
                        name: "Prenom",
                        type: "varchar",
                    },
                    {
                        name: "Adresse",
                        type: "varchar",
                    },
                    {
                        name: "IdCarteAbonn",
                        type: "int",
                    },
                    {
                        name: "Points",
                        type: "int",
                    },
                ]
            }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable("Locataire");

    }

}
