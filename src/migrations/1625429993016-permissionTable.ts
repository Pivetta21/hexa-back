import { MigrationInterface, QueryRunner } from 'typeorm';

export class permissionTable1625429993016 implements MigrationInterface {
  name = 'permissionTable1625429993016';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "permission" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, CONSTRAINT "UQ_240853a0c3353c25fb12434ad33" UNIQUE ("name"), CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`,
    );

    await queryRunner.query(
      `INSERT INTO "permission" ("name") VALUES ('ADMIN'), ('STAFF'), ('USER')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "permission"`);
  }
}
