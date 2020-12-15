const getNicknames = (sockets) => {
  return sockets.map((sock) => sock.nickname);
};

const doesNameExist = (candidateName, sockets) => {
  if (sockets.length === 0) return;
  const nicknames = getNicknames(sockets);
  return nicknames.includes(candidateName);
};

module.exports = {
  doesNameExist,
  getNicknames,
};
