import { MigrationInterface, QueryRunner } from 'typeorm';

export class Seed2617378125500 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Users
        await queryRunner.query("INSERT INTO \"User\"(\"idUser\", \"userName\", \"phoneNumber\", \"lastName\", \"firstName\", address, \"userType\") VALUES (1, 'slimani-nabil', '0656384914', 'Slimani', 'Nabil', 'alger', 'decision_maker')")
        await queryRunner.query("INSERT INTO \"User\"(\"idUser\", \"userName\", \"phoneNumber\", \"lastName\", \"firstName\", address, \"userType\") VALUES (2, 'tiaiba-nabil', '0656384914', 'Tiaiba', 'Nabil', 'alger', 'agent_admin')")
        await queryRunner.query("INSERT INTO \"User\"(\"idUser\", \"userName\", \"phoneNumber\", \"lastName\", \"firstName\", address, \"userType\") VALUES (3, 'otsmane-nabil', '0656384914', 'Otsmane', 'Nabil', 'alger', 'agent')")
        await queryRunner.query("INSERT INTO \"User\"(\"idUser\", \"userName\", \"phoneNumber\", \"lastName\", \"firstName\", address, \"userType\") VALUES (7, 'bilal-benoudjit', '0656384914', 'Benoudjit', 'Bilal', 'alger', 'agent')")
        await queryRunner.query("INSERT INTO \"User\"(\"idUser\", \"userName\", \"phoneNumber\", \"lastName\", \"firstName\", address, \"userType\") VALUES (8, 'hamou-aitabderrahim', '0656384914', 'Ait Abderrahim', 'Hamou', 'alger', 'agent')")
        await queryRunner.query("INSERT INTO \"User\"(\"idUser\", \"userName\", \"phoneNumber\", \"lastName\", \"firstName\", address, \"userType\") VALUES (9, 'taha-loucif', '0656384914', 'Loucif', 'Taha', 'alger', 'agent')")
        await queryRunner.query("INSERT INTO \"User\"(\"idUser\", \"userName\", \"phoneNumber\", \"lastName\", \"firstName\", address, \"userType\") VALUES (4, 'kechaoui-haroun', '0656384914', 'Kechaoui', 'Haroun', 'alger', 'technical_admin')")
        await queryRunner.query("INSERT INTO \"User\"(\"idUser\", \"userName\", \"phoneNumber\", \"lastName\", \"firstName\", address, \"userType\") VALUES (5, 'saoudi-foufa', '0656384914', 'Saoudi', 'Foufa', 'alger', 'account_admin')")
        await queryRunner.query("INSERT INTO \"User\"(\"idUser\", \"userName\", \"phoneNumber\", \"lastName\", \"firstName\", address, \"userType\") VALUES (6, 'rihani-safi', '0656384914', 'Rihani', 'Safi', 'alger', 'tenant')")
        await queryRunner.query("INSERT INTO \"User\"(\"idUser\", \"userName\", \"phoneNumber\", \"lastName\", \"firstName\", address, \"userType\") VALUES (10, 'khadri-zineddine', '0656384914', 'Khadri', 'Zineddine', 'alger', 'tenant')")
        await queryRunner.query("INSERT INTO \"User\"(\"idUser\", \"userName\", \"phoneNumber\", \"lastName\", \"firstName\", address, \"userType\") VALUES (11, 'dadoun-amine', '0656384914', 'Dadoun', 'Amine', 'alger', 'tenant')")
        await queryRunner.query("INSERT INTO \"User\"(\"idUser\", \"userName\", \"phoneNumber\", \"lastName\", \"firstName\", address, \"userType\") VALUES (12, 'maya-larbi', '0656384914', 'Larbi', 'Maya', 'alger', 'tenant')")

        // AuthUsers
        await queryRunner.query("INSERT INTO \"AuthUser\"(\"idUser\", email, password) VALUES (1, 'hn_slimani@esi.dz', '$2b$10$h5nhUGNT361Ph4Lp1J2xHOp7/7OdBCBuE/p8r8fXEeRNItP8Q7rKy')")
        await queryRunner.query("INSERT INTO \"AuthUser\"(\"idUser\", email, password) VALUES (2, 'hn_tiaiba@esi.dz', '$2b$10$h5nhUGNT361Ph4Lp1J2xHOp7/7OdBCBuE/p8r8fXEeRNItP8Q7rKy')")
        await queryRunner.query("INSERT INTO \"AuthUser\"(\"idUser\", email, password) VALUES (3, 'hn_otsmane@esi.dz', '$2b$10$h5nhUGNT361Ph4Lp1J2xHOp7/7OdBCBuE/p8r8fXEeRNItP8Q7rKy')")
        await queryRunner.query("INSERT INTO \"AuthUser\"(\"idUser\", email, password) VALUES (4, 'hh_kechaoui@esi.dz', '$2b$10$h5nhUGNT361Ph4Lp1J2xHOp7/7OdBCBuE/p8r8fXEeRNItP8Q7rKy')")
        await queryRunner.query("INSERT INTO \"AuthUser\"(\"idUser\", email, password) VALUES (5, 'ha_saoudi@esi.dz', '$2b$10$h5nhUGNT361Ph4Lp1J2xHOp7/7OdBCBuE/p8r8fXEeRNItP8Q7rKy')")
        await queryRunner.query("INSERT INTO \"AuthUser\"(\"idUser\", email, password) VALUES (6, 'hs_rihani@esi.dz', '$2b$10$h5nhUGNT361Ph4Lp1J2xHOp7/7OdBCBuE/p8r8fXEeRNItP8Q7rKy')")

        // Tenants
        await queryRunner.query("INSERT INTO \"Tenant\"(\"idUser\", \"profilePicture\", \"permitPicture\", selfie, \"accountState\") VALUES (6, 'test', 'test2', 'test3', 'pending')")
        await queryRunner.query("INSERT INTO \"Tenant\"(\"idUser\", \"profilePicture\", \"permitPicture\", selfie, \"accountState\") VALUES (10, 'test', 'test2', 'test3', 'pending')")
        await queryRunner.query("INSERT INTO \"Tenant\"(\"idUser\", \"profilePicture\", \"permitPicture\", selfie, \"accountState\") VALUES (11, 'test', 'test2', 'test3', 'pending')")
        await queryRunner.query("INSERT INTO \"Tenant\"(\"idUser\", \"profilePicture\", \"permitPicture\", selfie, \"accountState\") VALUES (12, 'test', 'test2', 'test3', 'pending')")

        // Agents
        await queryRunner.query("INSERT INTO \"Agent\"(\"idUser\", \"personalPhoto\", \"refPermis\") VALUES (3, 'test', '0112557875462165')")
        await queryRunner.query("INSERT INTO \"Agent\"(\"idUser\", \"personalPhoto\", \"refPermis\") VALUES (7, 'test', '0112557875462165')")
        await queryRunner.query("INSERT INTO \"Agent\"(\"idUser\", \"personalPhoto\", \"refPermis\") VALUES (8, 'test', '0112557875462165')")
        await queryRunner.query("INSERT INTO \"Agent\"(\"idUser\", \"personalPhoto\", \"refPermis\") VALUES (9, 'test', '0112557875462165')")

        // AdminAgent
        await queryRunner.query("INSERT INTO \"AdminAgent\"(\"idUser\") VALUES (2)")

        // AdminAccount
        await queryRunner.query("INSERT INTO \"AdminAccount\"(\"idUser\") VALUES (5)")

        // AdminTechnical
        await queryRunner.query("INSERT INTO \"AdminTechnical\"(\"idUser\") VALUES (4)")
        
        // DecisionMaker
        await queryRunner.query("INSERT INTO \"DecisionMaker\"(\"idUser\") VALUES (1)")

        // Borne
        await queryRunner.query("INSERT INTO \"Borne\"(\"idBorne\", \"nbOccupiedPlaces\", \"nbTotalPlaces\", \"nbMaintenanceAgents\", longitude, latitude, city) VALUES (1, 0, 20, 0, 3.085053, 36.739847, 'alger')")
        await queryRunner.query("INSERT INTO \"Borne\"(\"idBorne\", \"nbOccupiedPlaces\", \"nbTotalPlaces\", \"nbMaintenanceAgents\", longitude, latitude, city) VALUES (2, 0, 20, 0, 6.622049, 36.333905, 'constantine')")
        await queryRunner.query("INSERT INTO \"Borne\"(\"idBorne\", \"nbOccupiedPlaces\", \"nbTotalPlaces\", \"nbMaintenanceAgents\", longitude, latitude, city) VALUES (3, 0, 20, 0, -0.641282, 35.698566, 'oran')")

        // Vehicle
        await queryRunner.query("INSERT INTO \"Vehicle\"(\"idBorne\", \"vehicleType\", vehiclebrand, vehiclemodel, availibility, image, \"fuelType\", \"unitPricePerHour\", \"unitPricePerDay\", \"vehicleColor\", longitude, latitude, \"registrationNumber\") VALUES (1, 'Electric', 'TOYOTA', 'AURIS HYBRID', 'available', 'test', 'super', 100, 500, 'black', 36.762214, 3.051917, '04122 212 25')")
        await queryRunner.query("INSERT INTO \"Vehicle\"(\"idBorne\", \"vehicleType\", vehiclebrand, vehiclemodel, availibility, image, \"fuelType\", \"unitPricePerHour\", \"unitPricePerDay\", \"vehicleColor\", longitude, latitude, \"registrationNumber\") VALUES (2, 'Electric', 'TOYOTA', 'AURIS HYBRID', 'available', 'test', 'super', 100, 500, 'red', 36.762214, 3.051917, '04123 221 25')")
    }

    public async down(_queryRunner: QueryRunner): Promise<void> {

    }
}