import { MigrationInterface, QueryRunner } from 'typeorm';

export class moduleTable1628402048953 implements MigrationInterface {
  name = 'moduleTable1628402048953';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "module"
                             (
                               "id"       SERIAL                 NOT NULL,
                               "name"     character varying(255) NOT NULL,
                               "courseId" integer                NOT NULL,
                               CONSTRAINT "PK_0e20d657f968b051e674fbe3117" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "module"
      ADD CONSTRAINT "FK_47d4039ae15a387ef27eccf3825" FOREIGN KEY ("courseId") REFERENCES "course" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "module"
      DROP CONSTRAINT "FK_47d4039ae15a387ef27eccf3825"`);
    await queryRunner.query(`DROP TABLE "module"`);
  }
}
