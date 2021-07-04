import { MigrationInterface, QueryRunner } from 'typeorm';

export class userTable1625432387323 implements MigrationInterface {
  name = 'userTable1625432387323';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "pictureUrl" character varying(255) NOT NULL, "password" character varying(400) NOT NULL, "signUpDate" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "isCreator" boolean NOT NULL DEFAULT FALSE, "permissionId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_792e68c26552db99eb40f4093c9" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_792e68c26552db99eb40f4093c9"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
