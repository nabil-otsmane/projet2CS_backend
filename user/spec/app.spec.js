var Request = require("request");

describe("GET /user", () => {
    
    it("returns status code 200", () => {
        
        var status = 200;
        
        Request.get("http://localhost:8100/users/2", (error, response, body) => {
                status = response.statusCode;
            });

        expect(status).toBe(200);
    });

});

   
describe("GET /users", () => {
    
    it("returns status code 200", () => {
        
        var status = 200;
        
        Request.get("http://localhost:8100/users/2", (error, response, body) => {
                status = response.statusCode;
            });

        expect(status).toBe(200);
    });

});

describe("POST /users", () => {

    it("Returns status code 200", () => {
        var status;
        Request.post({
            url: "http://localhost:8100/users",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({
                userName: "testUserName",
                firstName: "testFirstName",
                lastName: "testLastName",
                address: "testAddress",
                phoneNumber: "testPhoneNumber"
            })
        },(error, response, body) => {
                status = response.statusCode;
            });

        expect(status).toBe(200);
    });
});




describe("GET /adminAgent", () => {
    
    it("returns status code 200", () => {
        
        var status = 200;
        
        Request.get("http://localhost:8100/agentAdmins/2", (error, response, body) => {
                status = response.statusCode;
            });

        expect(status).toBe(200);
    });

});

   
describe("GET /agentAdmins", () => {
    
    it("returns status code 200", () => {
        
        var status = 200;
        
        Request.get("http://localhost:8100/agentAdmins/2", (error, response, body) => {
                status = response.statusCode;
            });

        expect(status).toBe(200);
    });

});

describe("POST /agentAdmins", () => {

    it("Returns status code 200", () => {
        var status;
        Request.post({
            url: "http://localhost:8100/agentAdmins",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({
                idUtilisateur: "idUtilisateurTest",
                addresse: "addresseTest"
            })
        },(error, response, body) => {
                status = response.statusCode;
            });

        expect(status).toBe(200);
    });
});




describe("GET /compteAdmin", () => {
    
    it("returns status code 200", () => {
        
        var status = 200;
        
        Request.get("http://localhost:8100/compteAdmins/2", (error, response, body) => {
                status = response.statusCode;
            });

        expect(status).toBe(200);
    });

});

   
describe("GET /compteAdmins", () => {
    
    it("returns status code 200", () => {
        
        var status = 200;
        
        Request.get("http://localhost:8100/compteAdmins/2", (error, response, body) => {
                status = response.statusCode;
            });

        expect(status).toBe(200);
    });

});

describe("POST /compteAdmins", () => {

    it("Returns status code 200", () => {
        var status;
        Request.post({
            url: "http://localhost:8100/compteAdmins",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({
                idUtilisateur: "idUtilisateurTest",
                addresse: "addresseTest"
            })
        },(error, response, body) => {
                status = response.statusCode;
            });

        expect(status).toBe(200);
    });
});


describe("GET /techniqueAdmin", () => {
    
    it("returns status code 200", () => {
        
        var status = 200;
        
        Request.get("http://localhost:8100/techniqueAdmins/2", (error, response, body) => {
                status = response.statusCode;
            });

        expect(status).toBe(200);
    });

});

   
describe("GET /techniqueAdmins", () => {
    
    it("returns status code 200", () => {
        
        var status = 200;
        
        Request.get("http://localhost:8100/techniqueAdmins/2", (error, response, body) => {
                status = response.statusCode;
            });

        expect(status).toBe(200);
    });

});

describe("POST /techniqueAdmins", () => {

    it("Returns status code 200", () => {
        var status;
        Request.post({
            url: "http://localhost:8100/techniqueAdmins",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({
                idUtilisateur: "idUtilisateurTest",
                addresse: "addresseTest"
            })
        },(error, response, body) => {
                status = response.statusCode;
            });

        expect(status).toBe(200);
    });
});



describe("GET /agent", () => {
    
    it("returns status code 200", () => {
        
        var status = 200;
        
        Request.get("http://localhost:8100/agents/2", (error, response, body) => {
                status = response.statusCode;
            });

        expect(status).toBe(200);
    });

});

   
describe("GET /agents", () => {
    
    it("returns status code 200", () => {
        
        var status = 200;
        
        Request.get("http://localhost:8100/agents/2", (error, response, body) => {
                status = response.statusCode;
            });

        expect(status).toBe(200);
    });

});

describe("POST /agents", () => {

    it("Returns status code 200", () => {
        var status;
        Request.post({
            url: "http://localhost:8100/agents",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({
                idUtilisateur: "idUtilisateurTest",
                nom: "nomTest",
                prenom: "prenomTest",
                addresse: "addresseTest",
                photo: "photoTest"
            })
        },(error, response, body) => {
                status = response.statusCode;
            });

        expect(status).toBe(200);
    });
});


describe("GET /decideurs", () => {
    
    it("returns status code 200", () => {
        
        var status = 200;
        
        Request.get("http://localhost:8100/decideurs/2", (error, response, body) => {
                status = response.statusCode;
            });

        expect(status).toBe(200);
    });

});

   
describe("GET /decideurs", () => {
    
    it("returns status code 200", () => {
        
        var status = 200;
        
        Request.get("http://localhost:8100/decideurs/2", (error, response, body) => {
                status = response.statusCode;
            });

        expect(status).toBe(200);
    });

});

describe("POST /decideurs", () => {

    it("Returns status code 200", () => {
        var status;
        Request.post({
            url: "http://localhost:8100/decideurs",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({
                idUtilisateur: "idUtilisateurTest",
                addresse: "addresseTest"
            })
        },(error, response, body) => {
                status = response.statusCode;
            });

        expect(status).toBe(200);
    });
});


describe("GET /locataire", () => {
    
    it("returns status code 200", () => {
        
        var status = 200;
        
        Request.get("http://localhost:8100/locataires/2", (error, response, body) => {
                status = response.statusCode;
            });

        expect(status).toBe(200);
    });

});

   
describe("GET /locataires", () => {
    
    it("returns status code 200", () => {
        
        var status = 200;
        
        Request.get("http://localhost:8100/locataires/2", (error, response, body) => {
                status = response.statusCode;
            });

        expect(status).toBe(200);
    });

});

describe("POST /locataires", () => {

    it("Returns status code 200", () => {
        var status;
        Request.post({
            url: "http://localhost:8100/locataires",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({
                idUtilisateur: "idUtilisateurTest",
                nom: "nomTest",
                prenom: "prenomTest",
                addresse: "addresseTest",
                photoPersonnelle: "photoPersonnelleTest",
                photoPermisSelfie: "photoPermisSelfieTest",
                idTypeAbonnement: "idTypeAbonnement"
            })
        },(error, response, body) => {
                status = response.statusCode;
            });

        expect(status).toBe(200);
    });
});