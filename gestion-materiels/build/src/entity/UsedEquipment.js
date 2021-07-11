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
exports.UsedEquipment = void 0;
const typeorm_1 = require("typeorm");
const Equipment_1 = require("./Equipment");
const Task_1 = require("./Task");
const SharedAttributes_1 = require("./SharedAttributes");
const class_validator_1 = require("class-validator");
let UsedEquipment = class UsedEquipment extends SharedAttributes_1.SharedAttributes {
    toJSON() {
        return Object.assign(Object.assign({}, this), { idUsedEquipment: undefined });
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UsedEquipment.prototype, "idUsedEquipment", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.Length(5, 255),
    __metadata("design:type", String)
], UsedEquipment.prototype, "description", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.Min(0),
    class_validator_1.Max(1000),
    __metadata("design:type", Number)
], UsedEquipment.prototype, "quantity", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Equipment_1.Equipment, (equipment) => equipment.usedEquipments),
    __metadata("design:type", Equipment_1.Equipment)
], UsedEquipment.prototype, "equipment", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Task_1.Task, (task) => task.usedEquipments),
    __metadata("design:type", Task_1.Task)
], UsedEquipment.prototype, "task", void 0);
UsedEquipment = __decorate([
    typeorm_1.Entity("UsedEquipment")
], UsedEquipment);
exports.UsedEquipment = UsedEquipment;
//# sourceMappingURL=UsedEquipment.js.map