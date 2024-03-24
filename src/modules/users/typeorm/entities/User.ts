import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity('users')
 class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
      nullable: true,
     })
    avatar: string;
    isNullable: true;
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at: Date;
}
export default User;

