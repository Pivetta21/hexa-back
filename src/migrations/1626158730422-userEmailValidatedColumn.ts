import { MigrationInterface, QueryRunner } from 'typeorm';

export class userEmailValidatedColumn1626158730422
  implements MigrationInterface
{
  name = 'userEmailValidatedColumn1626158730422';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "isEmailValidated" boolean NOT NULL DEFAULT FALSE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "isEmailValidated"`,
    );
  }
}
