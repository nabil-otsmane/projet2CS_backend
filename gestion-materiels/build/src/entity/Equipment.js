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
exports.Equipment = void 0;
const typeorm_1 = require("typeorm");
const SharedAttributes_1 = require("./SharedAttributes");
const UsedEquipment_1 = require("./UsedEquipment");
let Equipment = class Equipment extends SharedAttributes_1.SharedAttributes {
    toJSON() {
        return Object.assign(Object.assign({}, this), { idEquipment: undefined });
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Equipment.prototype, "idEquipment", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Equipment.prototype, "equipmentName", void 0);
__decorate([
    typeorm_1.Column({ type: "double precision" }),
    __metadata("design:type", Number)
], Equipment.prototype, "unitPrice", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Equipment.prototype, "category", void 0);
__decorate([
    typeorm_1.OneToMany(() => UsedEquipment_1.UsedEquipment, (usedEquipment) => usedEquipment.equipment),
    __metadata("design:type", Array)
], Equipment.prototype, "usedEquipments", void 0);
Equipment = __decorate([
    typeorm_1.Entity("Equipment")
], Equipment);
exports.Equipment = Equipment;
//# sourceMappingURL=Equipment.js.map