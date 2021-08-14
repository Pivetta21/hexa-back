import { MigrationInterface, QueryRunner } from 'typeorm';

export class videoCommentsTable1628979309429 implements MigrationInterface {
  name = 'videoCommentsTable1628979309429';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "video_comments"
                             (
                               "id"           SERIAL    NOT NULL,
                               "text"         text      NOT NULL,
                               "published_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                               "videoId"      integer   NOT NULL,
                               "userId"       integer   NOT NULL,
                               CONSTRAINT "PK_bfe25ab13a4b2e47a3da9b3302a" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "video_comments"
      ADD CONSTRAINT "FK_2ba4e7417c624e7112b5fff0021" FOREIGN KEY ("videoId") REFERENCES "video" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "video_comments"
      ADD CONSTRAINT "FK_1ffa7626ff39614e7997a3ec76c" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "video_comments"
      DROP CONSTRAINT "FK_1ffa7626ff39614e7997a3ec76c"`);
    await queryRunner.query(`ALTER TABLE "video_comments"
      DROP CONSTRAINT "FK_2ba4e7417c624e7112b5fff0021"`);
    await queryRunner.query(`DROP TABLE "video_comments"`);
  }
}
