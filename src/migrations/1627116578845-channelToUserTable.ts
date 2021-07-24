import { MigrationInterface, QueryRunner } from 'typeorm';

export class channelToUserTable1627116578845 implements MigrationInterface {
  name = 'channelToUserTable1627116578845';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "channel_to_user"
                             (
                               "id"          SERIAL    NOT NULL,
                               "followed_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                               "channelId"   integer,
                               "userId"      integer,
                               CONSTRAINT "PK_d541318ad56b3fcdd819b180bc2" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "channel_to_user"
      ADD CONSTRAINT "FK_bdb2daf4c9ac5ba30f10341d1b5" FOREIGN KEY ("channelId") REFERENCES "channel" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "channel_to_user"
      ADD CONSTRAINT "FK_b10b6239c1c68f4ec5f47bf3b7d" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "channel_to_user"
      DROP CONSTRAINT "FK_b10b6239c1c68f4ec5f47bf3b7d"`);
    await queryRunner.query(`ALTER TABLE "channel_to_user"
      DROP CONSTRAINT "FK_bdb2daf4c9ac5ba30f10341d1b5"`);
    await queryRunner.query(`DROP TABLE "channel_to_user"`);
  }
}
