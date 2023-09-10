import { aggregate } from '@makerdao/multicall';
import { Arbitrum } from '@/config';
import { BeeContracts } from '@/nft-config';
import store from '@/store';
import { ethers } from 'ethers';
import { getEthWeb } from './web3';
import { waitForTx } from './ethers';
import axios from 'axios';

/**
 * get user's holding nfts
 * @param {*} address user address
 * @param {*} type NFT type: black, golden, purple
 */
export async function getUserHolding(address, type) {
    let contract = BeeContracts[type];
    if (!contract || ethers.utils.isAddress(address)) return [];
    let calls = [
        {
            target: contract,
            call: [
                'balanceOf(address)(uint256)',
                address
            ],
            returns: [
                ['balance', val => val / 1]
            ]
        }
    ]
    let balance = await aggregate(calls, Arbitrum.Multi_Config);
    balance = balance.results.transformed.balance;
    if (balance === 0) return [];
    calls = (new Array(balance).fill(1)).map((item, i) => ({
        target: contract,
        call: [
            'tokenOfOwnerByIndex(address,uint256)(utint256)',
            address,
            i
        ],
        returns: [
            [
                i, val => val / 1
            ]
        ]
    }));
    let ids = await aggregate(calls, Arbitrum.Multi_Config)
    ids = Object.values(ids.results.transformed)
    return ids;
}

export async function checkBlackBeeWhitelist(address) {
    if (!ethers.utils.isAddress(address)) return false;
    try {
        const res = await aggregate([{
            target: BeeContracts.black,
            call: [
                'whitelist(address)(bool)',
                address
            ],
            returns: [
                ['inWhiteList']
            ]
        }, {
            target: BeeContracts.black,
            call: [
                'whitelistUpdateTime(address)(uint256)',
                address
            ],
            returns: [
                ['updateTime', val => val / 1]
            ]
        }, {
            target: BeeContracts.black,
            call: [
                'hasMintedNFT(address)(bool)',
                address
            ],
            returns: [
                ['hasMinted']
            ]
        }, {
            target: BeeContracts.black,
            call: [
                'whileListExpirationDay()(uint256)'
            ],
            returns: [
                ['expirationDay', val => val / 1]
            ]
        }], Arbitrum.Multi_Config);
        const result = res.results.transformed;
        return result;
    } catch (e) {
        console.log('check balck bee whitelist fail:', e);
        return {}
    }
}

export async function getPendingGoldenBeeCount() {
    try {
        const res = await aggregate([{
            target: BeeContracts.golden,
            call: [
                'pendingNFTLength()(uint256)'
            ],
            returns: [
                ['count', val => val.toString() / 1]
            ]
        }], Arbitrum.Multi_Config);
        let count = res.results.transformed.count;
        return count
    }catch(e) {
        console.log('get pending golden bee count fail:', e)
        return 0;
    }
}

export async function getGoldenBeeUrls(ids) {
    try {
        const calls = ids.map(id => ({
            target: BeeContracts.golden,
            call: [
                'tokenURI(uint256)(string)',
                id
            ],
            returns: [
                [id]
            ]
        }))
        const res = await aggregate(calls, Arbitrum.Multi_Config);
        return res.results.transformed;
    } catch (e) {
        console.log('get golden bee urls fail:', e);
        return {};
    }
}

export async function getTotalSupply(type) {
    try {
        const supply = await aggregate([{
            target: BeeContracts[type],
            call: [
                'totalSupply()(uint256)',
            ],
            returns: [
                ['supply', val => val.toString() / 1]
            ]
        }], Arbitrum.Multi_Config);
        return supply.results.transformed.supply;
    } catch (e) {
        console.log("get nft total supply fail:", e);
        return 0;
    }
}

export async function getOwnerOfBlackBeeIds(ids) {
    try {
        const calls = ids.map(id => ({
            target: BeeContracts.black,
            call: [
                'ownerOf(uint256)(address)',
                id
            ],
            returns: [
                [id]
            ]
        }))
        const holders = await aggregate(calls, Arbitrum.Multi_Config)
        return holders.results.transformed;
    } catch (e) {
        console.log('Get owner of black bee ids fail:', e);
        return {}
    }
}

/**
 * Get the black bee tokens id those has been minted
 */
export async function getMintedBlackBeeIds() {
    try{
        const supply = await getTotalSupply('black');
        if (supply === 0) return [];
        const calls = (new Array(supply).fill(1)).map((item, i) => ({
            target: BeeContracts.black,
            call: [
                'tokenByIndex(uint256)(uint256)',
                i
            ],
            returns: [
                [i, val => val / 1]
            ]
        }))
        const mintedTokens = await aggregate(calls, Arbitrum.Multi_Config);
        return Object.values(mintedTokens.results.transformed)
    }catch(e) {
        console.log('Get minted black bee ids fail:', e);
        return {};
    }
}

export async function mintBlackBee(tokenId) {
    if (tokenId <= 0 || tokenId > 66) {
        return false;
    }
    const abi = [{
        "inputs": [
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "mintNFT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }]
    const metamask = await getEthWeb();
    const provider = new ethers.providers.Web3Provider(metamask);
    let contract = new ethers.Contract(BeeContracts.black, abi, provider);

    const tx = await contract.mintNFT(tokenId);
    await waitForTx(provider, tx.hash);
    return true;
}

export async function mintGoldenBee() {
    return new Promise(async (resolve, reject) => {
        try {
            let abi = [{
                "inputs": [],
                "name": "mintNFT",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              }];
              
              const metamask = await getEthWeb();
              const provider = new ethers.providers.Web3Provider(metamask);
              let contract = new ethers.Contract(BeeContracts.black, abi, provider);
              contract.on("Minted", (owner, tokenId, uri) => {
                if (owner.toLowerCase() == store.state.web3.account.toLowerCase()) {
                    contract.removeAllListeners('Minted');
                    resolve({tokenId, uri})
                }
              })
              const tx = await contract.mintNFT();
        } catch (e) {
            console.log("mint golden bee fail:", e);
            reject(e)
        }
    })

}