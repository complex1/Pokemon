const PikachuService = require('../Service/pikachuService');
const PikachuController = {}

PikachuController.getFolders = (req, res) => {
  const user = req.user;
  PikachuService.getFolders(user).then(result => {
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
  }
  )
}

PikachuController.addFolder = (req, res) => {
  const user = req.user;
  const folderName = req.body.folderName;
  PikachuService.addFolder(user, folderName).then(result => {
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
  }
  )
}

PikachuController.deleteFolder = (req, res) => {
  const user = req.user;
  const folderId = req.params.folderId;
  PikachuService.deleteFolder(user, folderId).then(result => {
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
  }
  )
}

PikachuController.getServers = (req, res) => {
  const folderId = req.params.folderId;
  PikachuService.getServers(folderId).then(result => {
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
  }
  )
}

PikachuController.addServer = (req, res) => {
  const user = req.user;
  const serverConfig = req.body;
  PikachuService.addServer(user, serverConfig).then(result => {
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
  }
  )
}

PikachuController.deleteServer = (req, res) => {
  const user = req.user;
  const serverId = req.params.serverId;
  PikachuService.deleteServer(user, serverId).then(result => {
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
  }
  )
}

PikachuController.updateServer = (req, res) => {
  const user = req.user;
  const serverId = req.params.serverId;
  const serverName = req.body.serverName;
  PikachuService.updateServer(user, serverId, serverName).then(result => {
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
  }
  )
}



module.exports = PikachuController;
