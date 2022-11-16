const Task = require('../Model/task')

const TaskService = {}

TaskService.createNewTask = function (user, taskObj) {
  const task = new Task({
    created_user: user.email,
    assigne_user: taskObj.assigne_user || user.email,
    title: taskObj.title || '',
    detail: taskObj.detail || '',
    preority: taskObj.preority || 'LOW',
    child: taskObj.child || '[]',
    parent: taskObj.parent || '[]',
    type: taskObj.type || 'TASK',
    state: taskObj.state || 'CREATED',
    completed_at: null,
    done_by: taskObj.done_by || null,
    comments: taskObj.comments || '[]',
    extras: taskObj.extras || null
  })
  return new Promise((resolve, reject) => {
    task.createNewTask().then(result => {
      resolve(result);
    }).catch(err => {
      reject(err);
    });
  });
}

module.exports = TaskService