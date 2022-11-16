const TaskService = require('../Service/taskService')
const TaskController = {}

TaskController.createNewTask = function (req, res) {
  const user = req.user;
  const task = req.body;

  TaskService.createNewTask(user, task).then(result => {
    res.send({
      hasError: false,
      data: result
    });
  }
  ).catch(err => {
    res.send({
      hasError: true,
      message: err.message
    });
  })
}

module.exports = TaskController