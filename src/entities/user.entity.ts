import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255, nullable: false })
  name: string;

  @Column('varchar', { length: 255, nullable: false, unique: true })
  email: string;

  @Column('varchar', { length: 255, nullable: true })
  pictureUrl: string;

  @Exclude()
  @Column('varchar', { length: 400, nullable: false })
  password: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  signUpDate: string;

  @Column('boolean', { default: () => 'FALSE' })
  isCreator: boolean;

  @Column('boolean', { default: () => 'FALSE' })
  isEmailValidated: boolean;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }
}
