import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from "typeorm";

import { v4 as uuid } from "uuid";

export abstract class SharedAttributes extends BaseEntity {
  @Column({ type: "uuid", nullable: true })
  uuid: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  createUUID() {
    this.uuid = uuid();
  }
}
