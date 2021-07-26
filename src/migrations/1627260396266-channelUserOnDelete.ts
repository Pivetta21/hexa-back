import { MigrationInterface, QueryRunner } from 'typeorm';

export class channelUserOnDelete1627260396266 implements MigrationInterface {
  name = 'channelUserOnDelete1627260396266';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "channel_to_user"
      DROP CONSTRAINT "FK_bdb2daf4c9ac5ba30f10341d1b5"`);
    await queryRunner.query(`ALTER TABLE "channel_to_user"
      DROP CONSTRAINT "FK_b10b6239c1c68f4ec5f47bf3b7d"`);
    await queryRunner.query(`ALTER TABLE "channel_to_user"
      ALTER COLUMN "channelId" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "channel_to_user"
      ALTER COLUMN "userId" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "channel_to_user"
      ADD CONSTRAINT "FK_bdb2daf4c9ac5ba30f10341d1b5" FOREIGN KEY ("channelId") REFERENCES "channel" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "channel_to_user"
      ADD CONSTRAINT "FK_b10b6239c1c68f4ec5f47bf3b7d" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "channel_to_user"
      DROP CONSTRAINT "FK_b10b6239c1c68f4ec5f47bf3b7d"`);
    await queryRunner.query(`ALTER TABLE "channel_to_user"
      DROP CONSTRAINT "FK_bdb2daf4c9ac5ba30f10341d1b5"`);
    await queryRunner.query(`ALTER TABLE "channel_to_user"
      ALTER COLUMN "userId" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "channel_to_user"
      ALTER COLUMN "channelId" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "channel_to_user"
      ADD CONSTRAINT "FK_b10b6239c1c68f4ec5f47bf3b7d" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "channel_to_user"
      ADD CONSTRAINT "FK_bdb2daf4c9ac5ba30f10341d1b5" FOREIGN KEY ("channelId") REFERENCES "channel" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }
}
