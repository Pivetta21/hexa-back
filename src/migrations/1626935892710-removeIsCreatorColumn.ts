import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeIsCreatorColumn1626935892710 implements MigrationInterface {
  name = 'removeIsCreatorColumn1626935892710';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isCreator"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "isCreator" boolean NOT NULL DEFAULT false`,
    );
  }
}
