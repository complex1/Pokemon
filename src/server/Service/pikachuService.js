const PikachuFolder = require('../Model/pikachuFolder');
const PikachuServer = require('../Model/pikachuServer');

const PikachuService = {}

PikachuService.getFolders = (user) => {
  const folder = new PikachuFolder(user.email);
  return new Promise((resolve, reject) => {
    folder.getFolders().then(result => {
      resolve(result);
    }).catch(err => {
      reject(err);
    });
  });
}

PikachuService.addFolder = (user, folderName) => {
  const folder = new PikachuFolder(user.email, folderName);
  return new Promise((resolve, reject) => {
    folder.addFolder().then(result => {
      resolve(result);
    }).catch(err => {
      reject(err);
    });
  });
}

PikachuService.deleteFolder = (user, folderId) => {
  const folder = new PikachuFolder(user.email);
  return new Promise((resolve, reject) => {
    folder.deleteFolder(folderId).then(result => {
      PikachuServer.deleteServerByFolder(folderId) 
      resolve(result);
    }).catch(err => {
      reject(err);
    });
  });
}

PikachuService.getServers = (folderId) => {
  const pikachuFolder = new PikachuFolder()
  const pikachuServer = new PikachuServer()
  return new Promise((resolve, reject) => {
    pikachuFolder.getFolderById(folderId).then((folder) => {
      pikachuServer.getServerByFolder(folderId).then((servers) => {
        resolve({
          folder,
          servers
        })
      }).catch((err => reject(err)))
    }).catch((err => reject(err)))
  })
}

PikachuService.addServer = (user, serverConfig) => {
  const server = new PikachuServer(
    user.email,
    serverConfig.serverName,
    serverConfig.proto,
    serverConfig.endpoint, 
    serverConfig.docPath,
    serverConfig.docVersion,
    serverConfig.folderId,
    serverConfig.folderName
  );
  return new Promise((resolve, reject) => {
    server.addServer().then(result => {
      resolve(result);
    }).catch(err => {
      reject(err);
    });
  });
}

PikachuService.updateServer = (user, serverId, serverName, proto, endpoint, docPath, folderId) => {
  const server = new PikachuServer(user.email, serverName, proto, endpoint, docPath, folderId);
  return new Promise((resolve, reject) => {
    server.updateServer(serverId).then(result => {
      resolve(result);
    }).catch(err => {
      reject(err);
    });
  });
}

PikachuService.deleteServer = (user, serverId) => {
  const server = new PikachuServer(user.email);
  return new Promise((resolve, reject) => {
    server.deleteServer(serverId).then(result => {
      resolve(result);
    }).catch(err => {
      reject(err);
    });
  });
}

module.exports = PikachuService;