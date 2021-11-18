const { deployProxy, deployer } = require('@openzeppelin/truffle-upgrades');

/*
CONSTANTS
*/
BLOCK_REWARDS = 10000000000000
START_BLOCK = 21526489
END_BLOCK = 21526490

const deployFixedAddress = async (...args) => {
    console.log('Deploying ' + args[0]);
    args[1].waitConfirmations = 1;
    const [signer] = await ethers.getSigners();
    const result = await deployments.deploy(...args);
    console.log('Deployed to ' + result.address);
    return result;
  };

const deployProxyFixedAddress = async (...args) => {
    console.log('Deploying proxy');
    const result = await upgrades.deployProxy(...args);
    return result;
};

module.exports = async function (deployer) {
    const [signer] = await ethers.getSigners();

    // Deploy the zero token
    const zeroDAO = await deployProxyFixedAddress('ZeroDAO', {
        contractName: 'ZeroDAO',
        args: ['zeroDAO', 'ZERO', '88000000000000000000000000'],
        from: deployer
    });

    // Deploy the master chef contract
    const masterChef = await deployFixedAddress('MasterChef', {
        contractName: 'MasterChef',
        args: [zeroDAO.address, signer.address, BLOCK_REWARDS, START_BLOCK, END_BLOCK],
        from: deployer
    });

    await zeroDAO.setMintAuthority(masterChef.address).wait()
};