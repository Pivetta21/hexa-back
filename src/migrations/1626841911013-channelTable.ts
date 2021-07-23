import { MigrationInterface, QueryRunner } from 'typeorm';

export class channelTable1626841911013 implements MigrationInterface {
  name = 'channelTable1626841911013';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "channel" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" text, "banner_url" character varying(255), "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "userId" integer NOT NULL, CONSTRAINT "UQ_800e6da7e4c30fbb0653ba7bb6c" UNIQUE ("name"), CONSTRAINT "REL_823bae55bd81b3be6e05cff438" UNIQUE ("userId"), CONSTRAINT "PK_590f33ee6ee7d76437acf362e39" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "channel" ADD CONSTRAINT "FK_823bae55bd81b3be6e05cff4383" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "channel" DROP CONSTRAINT "FK_823bae55bd81b3be6e05cff4383"`,
    );
    await queryRunner.query(`DROP TABLE "channel"`);
  }
}
