import { MigrationInterface, QueryRunner } from 'typeorm';

export class courseRegistrationTable1628733351206
  implements MigrationInterface
{
  name = 'courseRegistrationTable1628733351206';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "course_registration"
                             (
                               "id"             SERIAL        NOT NULL,
                               "price"          numeric(5, 2) NOT NULL,
                               "rate"           numeric(2, 1),
                               "watched_videos" integer       NOT NULL DEFAULT 0,
                               "created_at"     TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
                               "finished_at"    TIMESTAMP,
                               "userId"         integer       NOT NULL,
                               "courseId"       integer       NOT NULL,
                               CONSTRAINT "PK_9d1160652d20cd7f5b399116171" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "course_registration"
      ADD CONSTRAINT "FK_da3ce0434f16e436a6f7363160b" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "course_registration"
      ADD CONSTRAINT "FK_e6d202d9f9cdbc5e146e21aeba5" FOREIGN KEY ("courseId") REFERENCES "course" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "course_registration"
      DROP CONSTRAINT "FK_e6d202d9f9cdbc5e146e21aeba5"`);
    await queryRunner.query(`ALTER TABLE "course_registration"
      DROP CONSTRAINT "FK_da3ce0434f16e436a6f7363160b"`);
    await queryRunner.query(`DROP TABLE "course_registration"`);
  }
}
