"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv = require("dotenv");
const express = require("express");
const express_1 = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes_1 = require("./routes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
const app = express();
app.use(express_1.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/equipment-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
dotenv.config();
app.use(routes_1.default);
typeorm_1.createConnection()
    .then((_connection) => __awaiter(void 0, void 0, void 0, function* () {
    const server = app.listen(process.env.SERVICE_PORT || 8080, () => {
        console.log(`🚀 Materials Up --> 🏠 LocalHost:${process.env.SERVICE_PORT || 8080} || 🐳 Docker:8002 `);
    });
}))
    .catch((error) => console.log(error));
//# sourceMappingURL=index.js.map