import { Entity, BaseEntity, PrimaryColumn, Column } from "typeorm";
@Entity("Tenant")
export class Tenant extends BaseEntity {

    @PrimaryColumn()
    idTenant: number;

    @Column()
    idUser: string;

    @Column()
    profilePicture: string;


}
