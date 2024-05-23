import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProjectTable1716493455943 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "projects",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            length: "100",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "description",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "start_at",
            type: "Date",
            isNullable: false,
          },
          {
            name: "end_at",
            type: "Date",
            isNullable: false,
          },
          {
            name: "active",
            type: "boolean",
            default: true,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("projects");
  }
}
