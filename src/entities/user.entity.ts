import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255, nullable: false })
  name: string;

  @Column('varchar', { length: 255, nullable: false, unique: true })
  email: string;

  @Column('varchar', { length: 255 })
  pictureUrl: string;

  @Column('varchar', { length: 400, nullable: false, select: false })
  password: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  signUpDate: string;

  @Column('boolean', { default: () => 'FALSE' })
  isCreator: boolean;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }
}
