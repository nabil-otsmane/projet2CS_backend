"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const typeorm_1 = require("typeorm");
const UsedEquipment_1 = require("./UsedEquipment");
const uuid_1 = require("uuid");
let Task = class Task extends typeorm_1.BaseEntity {
    createUUID() {
        this.uuid = uuid_1.v4();
    }
    toJSON() {
        return Object.assign(Object.assign({}, this), { idTask: undefined });
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Task.prototype, "idTask", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Task.prototype, "idAgent", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Task.prototype, "idVehicle", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Task.prototype, "description", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Task.prototype, "idTaskState", void 0);
__decorate([
    typeorm_1.OneToMany(() => UsedEquipment_1.UsedEquipment, (usedEquipment) => usedEquipment.task),
    __metadata("design:type", Array)
], Task.prototype, "usedEquipments", void 0);
__decorate([
    typeorm_1.Column({ type: "uuid" }),
    __metadata("design:type", String)
], Task.prototype, "uuid", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Task.prototype, "createUUID", null);
Task = __decorate([
    typeorm_1.Entity("Task")
], Task);
exports.Task = Task;
//# sourceMappingURL=Task.js.map