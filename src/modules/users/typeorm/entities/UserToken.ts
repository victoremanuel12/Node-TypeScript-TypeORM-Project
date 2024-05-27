import { Entity, PrimaryGeneratedColumn, Column, Generated } from "typeorm"

@Entity('userToken')
 class UserToken {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    @Generated('uuid')
    Token: string;

    @Column()
    user_id: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at: Date;
}
export default UserToken;

