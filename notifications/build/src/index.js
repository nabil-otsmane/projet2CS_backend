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
const express = require("express");
const express_1 = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes_1 = require("./routes/");
const app = express();
app.use(express_1.json());
app.use(cors());
app.use(morgan("dev"));
app.use(routes_1.default);
typeorm_1.createConnection()
    .then((_connection) => __awaiter(void 0, void 0, void 0, function* () {
    app.listen(8000, () => {
        console.log("Notification service is up working on port 8000.");
    });
}))
    .catch((error) => console.log(error));
//# sourceMappingURL=index.js.map