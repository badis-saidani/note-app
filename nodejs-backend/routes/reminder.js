const reminderRouter = require('express').Router();
const reminderRepo = require('../repository/reminderRepository');

reminderRouter.get("/:uid", reminderRepo.getReminders);
reminderRouter.get("/:uid/:id", reminderRepo.getSingleReminder);
reminderRouter.post("/:uid", reminderRepo.addReminder);
reminderRouter.delete("/:uid/:id", reminderRepo.deleteReminder);
reminderRouter.patch("/:uid/:id", reminderRepo.updateReminder);



module.exports = reminderRouter;