import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToOne,
  JoinTable,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Users } from 'src/auth/users.entity';

@Entity('Profile')
@Unique(['user'])
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  image: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToMany(() => Users, (user) => user.followers)
  @JoinTable({
    name: 'following',
    joinColumn: { name: 'followingId', referencedColumnName: 'id' },
  })
  following: Users[];

  @ManyToMany(() => Users, (user) => user.following)
  @JoinTable({
    name: 'followers',
    joinColumn: { name: 'followersId', referencedColumnName: 'id' },
  })
  followers: Users[];

  @OneToOne(() => Users, (user) => user.profile)
  @JoinColumn()
  user: Users;

  @Column()
  userId: number;
}
