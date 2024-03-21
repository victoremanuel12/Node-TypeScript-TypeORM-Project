import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity('products')
 class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    quantity: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at: Date;
}
export default Product;

