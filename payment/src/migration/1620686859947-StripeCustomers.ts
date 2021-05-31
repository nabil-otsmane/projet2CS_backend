import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class StripeCustomers1620686859947 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "Stripe_customers",
            columns: [
                {
                    name: "id",
                    type: 'varchar',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: "cusromerId",
                    type: "varchar",
                },
                {
                    name: "userId",
                    type: "int",
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        }), true)
    }

    public async down(): Promise<void> {
    }

}
