const { deployProxy } = require('@openzeppelin/truffle-upgrades');
const ZeroDAO = artifacts.require('ZeroDAO');

module.exports = async function (deployer) {
    await deployProxy(ZeroDAO, ['zeroDAO', 'ZERO', '88000000000000000000000000'], { deployer, initializer: 'initialize' });
};