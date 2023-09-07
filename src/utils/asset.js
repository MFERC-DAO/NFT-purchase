import { aggregate } from '@makerdao/multicall';
import { Arbitrum, MFERC } from '@/config';
import store from '@/store';
import { ethers } from 'ethers';
import { getEthWeb } from './web3';
import { waitForTx } from './ethers';
import axios from 'axios';

export async function getBalance(address, token) {
    if (!ethers.utils.isAddress(address) || !ethers.utils.isAddress(token)) return 0;
    try {
        let balance  = await aggregate([{
            target: token,
            call: [
                'balanceOf(address)(uint256)',
                address
            ],
            returns: [
                ['balance', val => val.toString() / 1e18]
            ]
        }])
        balance = balance.results.transformed.balance;
        store.state.asset.saveMfercBalance(balance);
        return balance;
    } catch (e) {
        console.log('get asset balance fail:', e)
        return 0;
    }
}

export async function getApprovement(address, token, spender) {
    if (!ethers.utils.isAddress(address) || !ethers.utils.isAddress(token) || !ethers.utils.isAddress(spender)) return 0;
    try {
        let calls = [
            {
                target: token,
                call: [
                    'allowance(address,address)(uint256)',
                    address,
                    spender
                ],
                returns: ['allowance', val => val.toString() / 1e18]
            }
        ]
        const res = await aggregate(calls, Arbitrum.Multi_Config);
        const approvement = res.results.transformed.allowance;
        return approvement;
    } catch (e) {
        console.log("get approvement fail:", e);
        return 0;
    }
}

export async function approve(address, token ,spender) {
    if (!ethers.utils.isAddress(address) || !ethers.utils.isAddress(token) || !ethers.utils.isAddress(spender)) return 0;
    const abi = [{
        "inputs": [
            {
            "internalType": "address",
            "name": "spender",
            "type": "address"
            },
            {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
            "internalType": "bool",
            "name": "",
            "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
        }]
    const metamask = await getEthWeb()
    const provider = new ethers.providers.Web3Provider(metamask)
    let contract = new ethers.Contract(token, abi, provider)
    contract = contract.connect(provider.getSigner())

    const tx = await contract.approve(spender, ethers.constants.MaxUint256);
    await waitForTx(provider, tx.hash)
    return true;
}