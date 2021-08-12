import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ChannelToUser } from './channel-user.entity';
import { CourseRegistration } from './course-registration.entity';

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
  @Column('varchar', { length: 400, nullable: false, select: false })
  password: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  signUpDate: string;

  @Column('boolean', { default: () => 'FALSE' })
  isEmailValidated: boolean;

  @OneToMany(() => ChannelToUser, (channelToUser) => channelToUser.user)
  channelToUsers: ChannelToUser[];

  @OneToMany(
    () => CourseRegistration,
    (courseRegistration) => courseRegistration.user,
  )
  courseRegistrations: CourseRegistration[];
}
