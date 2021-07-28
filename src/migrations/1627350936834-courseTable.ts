import { MigrationInterface, QueryRunner } from 'typeorm';

export class courseTable1627350936834 implements MigrationInterface {
  name = 'courseTable1627350936834';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "course"
                             (
                               "id"          SERIAL                 NOT NULL,
                               "name"        character varying(255) NOT NULL,
                               "description" text,
                               "image_url"   character varying(255),
                               "price"       numeric(5, 2)          NOT NULL,
                               "isPublic"    boolean                NOT NULL,
                               "created_at"  TIMESTAMP              NOT NULL DEFAULT CURRENT_TIMESTAMP,
                               "channelId"   integer                NOT NULL,
                               CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "course"
      ADD CONSTRAINT "FK_d4bf96c6ca41a3762fc517839ef" FOREIGN KEY ("channelId") REFERENCES "channel" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "course"
      DROP CONSTRAINT "FK_d4bf96c6ca41a3762fc517839ef"`);
    await queryRunner.query(`DROP TABLE "course"`);
  }
}
