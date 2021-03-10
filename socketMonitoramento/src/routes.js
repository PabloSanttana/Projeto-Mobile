const express = require("express");
const router = express.Router();

const AuthController = require("./controllers/AuthController");
const ModuleCaregiver = require("./controllers/ModuleCaregiverController");
const ModuleDoctor = require("./controllers/ModuleDoctorController");
const MessageController = require("./controllers/MessageController");

router.post("/login", AuthController.authModuleDoctor);
router.post("/login/paciente", AuthController.authModuleCaregiver);

router.get("/paciente/status/:id", ModuleCaregiver.patientStatus);
router.get("/meuspaciente", ModuleDoctor.indexPatient);

router.get("/meuspaciente/classificacao", ModuleDoctor.patientClassification);
router.get("/room/messages", MessageController.index);

router.get("/notificacao/paciente", ModuleCaregiver.notificationPatient);

router.get("/notificacao/medico/count", ModuleDoctor.notificationsNumbers);

router.get("/notificacao/medico", ModuleDoctor.indexNotifications);

router.post("/notificacao/paciente/clear", ModuleCaregiver.clearNotification);

router.post("/notificacao/medico/clear", ModuleDoctor.clearNotifications);

// Logout

router.post("/logout/medico", AuthController.LogoutModuleDoctor);

router.post("/logout/paciente", AuthController.LogoutModuleCaregiver);

module.exports = router;
