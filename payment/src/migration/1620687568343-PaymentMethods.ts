import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class PaymentMethods1620687568343 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "Payment_methods",
            columns: [
                {
                    name: "id",
                    type: 'varchar',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: "stripeCustomerId",
                    type: "varchar",
                },
                {
                    name: "paymentId",
                    type: "varchar",
                },
                {
                    name: "cardToken",
                    type: "varchar",
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
        const foreignKey = new TableForeignKey({
            columnNames: ["stripeCustomerId"],
            referencedColumnNames: ["id"],
            referencedTableName: "Stripe_customers",
            onDelete: "CASCADE"
        });
        await queryRunner.createForeignKey("Payment_methods", foreignKey);

    }

    public async down(): Promise<void> {
    }

}
