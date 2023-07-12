const { BigNumberish, BigNumber}  = require('ethers');
const {floatToFixed}  = require('./utils');
const ethers = require('ethers');
const { defaultAbiCoder } = require('ethers').utils;

let lookback = BigInt(3600e18);

function getTickSpacing(tickSpacing){
    return BigInt(Math.floor(Math.log(tickSpacing) / Math.log(1.0001)));
};

async function getRouter(){};

async function getFactory(){};

async function multicall(_router, _callData, _params){
    const response = await _router.multicall(_callData, _params); 
    return await response.wait();
}

async function getPool(){

};

async function getEthBPool(){

};

// token之间互相交易
async function swapTokenToToken(_router, _tokenIn, _tokenOut, _amount, _wallet, _isStable=false){
    const factoryAddress = await _router.factory();
    const routes = [
        {
            from: _tokenIn,
            to: _tokenOut,
            stable: _isStable,
            factory: factoryAddress
        }
    ];
    const response = await _router.swapExactTokensForTokens(
        _amount,
        BigNumber.from(0), 
        routes,
        _wallet.address,
        BigNumber.from(Math.floor(Date.now() / 1000)).add(1800)
        )
    return await response.wait();
};

// 从原生ETH换成其它币。
async function swapEthToToken(_router, _tokenIn, _tokenOut, _amount, _wallet, _isStable=false){
    const factoryAddress = await _router.factory();
    const routes = [
        {
            from: _tokenIn,
            to: _tokenOut,
            stable: _isStable,
            factory: factoryAddress
        }
    ];
    const params = {
        value:_amount
    };
    const response = await _router.swapExactETHForTokens(
        BigNumber.from(0), 
        routes,
        _wallet.address,
        BigNumber.from(Math.floor(Date.now() / 1000)).add(1800),
        params 
        )
    return await response.wait();
};
// 从其他币换成ETH
async function swapTokenToETH(_router, _tokenIn, _tokenOut, _amount, _wallet, _isStable=false){
    const factoryAddress = await _router.factory();
    const routes = [
        {
            from: _tokenIn,
            to: _tokenOut,
            stable: _isStable,
            factory: factoryAddress
        }
    ];
    const response = await _router.swapExactTokensForETH(
        _amount,
        BigNumber.from(0), 
        routes,
        _wallet.address,
        BigNumber.from(Math.floor(Date.now() / 1000)).add(1800)
        )
    return await response.wait();
};


async function addLiquidityToPool(_router, _pool, _tokenAAmount, _tokenBAmount, _tokenid=0, _kind=0){
    const tx = await router.addLiquidityToPool(
        _pool,
        _tokenId,
        [
          {
            kind: _kind,
            isDelta: true,
            pos: 0,
            deltaA: floatToFixed(500),
            deltaB: floatToFixed(500),
          },
        ],
        0,
        0,
        maxDeadline
      );
};

async function removeLiquidityOfPool(){};

module.exports = {swapEthToToken, swapTokenToETH,swapTokenToToken};
