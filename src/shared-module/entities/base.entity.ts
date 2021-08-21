import { Column, CreateDateColumn, DeleteDateColumn, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export class BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    @Generated('uuid')
    uuid: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', nullable: true })
    updatedAt: Date;

    // Soft Delete
    @DeleteDateColumn({ name: 'deleted_at', nullable: true })
    deletedAt?: Date;

    @Column({ name: 'deleted', nullable: true })
    deleted?: boolean = false;




}