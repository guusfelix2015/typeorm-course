import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateAddressTable1716322566903 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "address",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "street",
            type: "varchar",
            length: "100",
            isNullable: false,
          },
          {
            name: "city",
            type: "varchar",
            length: "100",
            isNullable: false,
          },
          {
            name: "state",
            type: "varchar",
            length: "2",
            isNullable: false,
          },
          {
            name: "user_id",
            type: "int",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      "address",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("address");
  }
}
