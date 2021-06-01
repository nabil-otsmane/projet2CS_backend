import { Router } from 'express';

import { getAdminTechnique, getAdminTechniques, addAdminTechnique, updateAdminTechnique, deleteAdminTechnique } from '../controllers/AdminTechnique'
import { getAgent, getAgents, addAgent, updateAgent, deleteAgent } from '../controllers/Agent'
import { getDecideur, getDecideurs, addDecideur, updateDecideur, deleteDecideur } from '../controllers/Decideur'
import { getLocataire, getLocataires, addLocataire, updateLocataire, deleteLocataire } from '../controllers/Locataire'
import { getAdminCompte, getAdminComptes, addAdminCompte, updateAdminCompte, deleteAdminCompte } from '../controllers/AdminCompte'
import { getUtilisateur, getUtilisateurs, addUtilisateur, updateUtilisateur, deleteUtilisateur } from '../controllers/Utilisateur'

const router = Router();


router.post('/locataires', addLocataire)
router.get('/locataires', getLocataires)
router.get('/locataires/:locataireId', getLocataire)
router.put('/locataires/:locataireId', updateLocataire)
router.delete('/locataires/:locataireId', deleteLocataire)



router.post('/decideurs', addDecideur)
router.get('/decideurs', getDecideurs)
router.get('/decideurs/:decideurId', getDecideur)
router.put('/decideurs/:decideurId', updateDecideur)
router.delete('/decideurs/:decideurId', deleteDecideur)



router.post('/agents', addAgent)
router.get('/agents', getAgents)
router.get('/agents/:agentId', getAgent)
router.put('/agents/:agentId', updateAgent)
router.delete('/agents/:agentId', deleteAgent)




router.post('/techniqueAdmins', addAdminTechnique)
router.get('/techniqueAdmins', getAdminTechniques)
router.get('/techniqueAdmins/:adminTechniqueId', getAdminTechnique)
router.put('/techniqueAdmins/:adminTechniqueId', updateAdminTechnique)
router.delete('/techniqueAdmins/:adminTechniqueId', deleteAdminTechnique)

  
  
router.post('/compteAdmins', addAdminCompte)
router.get('/compteAdmins', getAdminComptes)
router.get('/compteAdmins/:adminCompteId', getAdminCompte)
router.put('/compteAdmins/:adminCompteId', updateAdminCompte)
router.delete('/compteAdmins/:adminCompteId', deleteAdminCompte)
  




router.post('/users', addUtilisateur)
router.get('/users', getUtilisateurs)
router.get('/users/:userId', getUtilisateur)
router.put('/users/:userId', updateUtilisateur)
router.delete('/users/:userId', deleteUtilisateur)


export default router;