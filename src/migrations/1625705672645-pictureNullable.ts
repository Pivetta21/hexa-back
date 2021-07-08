import { MigrationInterface, QueryRunner } from 'typeorm';

export class pictureNullable1625705672645 implements MigrationInterface {
  name = 'pictureNullable1625705672645';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "pictureUrl" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "pictureUrl" SET NOT NULL`,
    );
  }
}
