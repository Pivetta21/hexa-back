import { MigrationInterface, QueryRunner } from 'typeorm';

export class emailConfirmationTable1626162308488 implements MigrationInterface {
  name = 'emailConfirmationTable1626162308488';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "email_confirmation" ("id" SERIAL NOT NULL, "code" integer NOT NULL, "expirationDate" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP + interval '24 hour', "userId" integer NOT NULL, CONSTRAINT "REL_28d3d3fbd7503f3428b94fd18c" UNIQUE ("userId"), CONSTRAINT "PK_ff2b80a46c3992a0046b07c5456" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "email_confirmation" ADD CONSTRAINT "FK_28d3d3fbd7503f3428b94fd18cc" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "email_confirmation" DROP CONSTRAINT "FK_28d3d3fbd7503f3428b94fd18cc"`,
    );
    await queryRunner.query(`DROP TABLE "email_confirmation"`);
  }
}
