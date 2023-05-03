const SUDToken = artifacts.require("SUDToken");

module.exports = function (deployer) {
  deployer.deploy(SUDToken);
};
