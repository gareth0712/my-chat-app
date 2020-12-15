const getNicknames = (sockets) => {
  return sockets.map((sock) => sock.nickname);
};

const doesNameExist = (candidateName, sockets) => {
  if (sockets.length === 0) return;
  const nicknames = getNicknames(sockets);
  return nicknames.includes(candidateName);
};

const isValidName = (candidateName) => {
  if (candidateName === '') return false;
  const regex = /[/\\`~!@#$%^&*()=+[\]{};:'"|,.<>? ]/;
  return !regex.test(candidateName);
};

module.exports = {
  doesNameExist,
  getNicknames,
  isValidName,
};
