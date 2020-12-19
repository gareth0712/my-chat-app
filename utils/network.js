const lookupPro = require('util').promisify(require('dns').lookup);
const os = require('os');

const getIpAddress = async () => {
  const hostname = os.hostname();
  const ipObj = await lookupPro(hostname);
  return ipObj.address;
};

module.exports = getIpAddress;
