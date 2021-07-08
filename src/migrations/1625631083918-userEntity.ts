import { MigrationInterface, QueryRunner } from 'typeorm';

export class userEntity1625631083918 implements MigrationInterface {
  name = 'userEntity1625631083918';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "pictureUrl" character varying(255) NOT NULL, "password" character varying(400) NOT NULL, "signUpDate" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "isCreator" boolean NOT NULL DEFAULT FALSE, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
