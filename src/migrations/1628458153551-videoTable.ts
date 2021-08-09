import { MigrationInterface, QueryRunner } from 'typeorm';

export class videoTable1628458153551 implements MigrationInterface {
  name = 'videoTable1628458153551';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "video"
                             (
                               "id"          SERIAL                 NOT NULL,
                               "name"        character varying(255) NOT NULL,
                               "description" text,
                               "video_url"   character varying(255) NOT NULL,
                               "moduleId"    integer                NOT NULL,
                               CONSTRAINT "PK_1a2f3856250765d72e7e1636c8e" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "video"
      ADD CONSTRAINT "FK_2ac6e2f862b9572910a4480b8dc" FOREIGN KEY ("moduleId") REFERENCES "module" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "video"
      DROP CONSTRAINT "FK_2ac6e2f862b9572910a4480b8dc"`);
    await queryRunner.query(`DROP TABLE "video"`);
  }
}
