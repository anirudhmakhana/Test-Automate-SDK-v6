import {
  AutomateSDK,
  Task,
  TriggerType,
  Web3Function,
} from "@gelatonetwork/automate-sdk-test";
import * as dotenv from "dotenv";
import { ethers } from "ethers";
dotenv.config();
if (!process.env.PK) throw new Error("Missing env PK");
const pk = process.env.PK;
// if (!process.env.PROVIDER_URL) throw new Error("Missing env PROVIDER_URL");
const providerUrl =
  "https://polygon-mainnet.g.alchemy.com/v2/KmPNhPyvGUUNah6nRGDCCLDSo8pMPNuq";
// const providerUrl = process.env.PROVIDER_URL;
const chainId = 421614; // amoy

const counterAutomateAddress = "0xdDF2D006e3010e62c354508D42a2eA5910A88bD2";
const counterAutomateABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newCount",
        type: "uint256",
      },
    ],
    name: "CounterIncremented",
    type: "event",
  },
  {
    inputs: [],
    name: "count",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "increment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const counterAutomateInterface = new ethers.Interface(counterAutomateABI);

const main = async () => {
  const provider = new ethers.JsonRpcProvider(providerUrl);

  const wallet = new ethers.Wallet(pk as string, provider);
  const sdk = new AutomateSDK(chainId, wallet as any);

  console.log("Getting active tasks...");
  console.log("Wallet address:", wallet.address);

  const activeTasks = await sdk.getActiveTasks(wallet.address);
  activeTasks.forEach((task: Task) => {
    console.log(`- ${task.name} (${task.taskId})`);
  });

  const { address } = await sdk.getDedicatedMsgSender();
  console.log("Dedicated msg.sender: ", address);
};
main()
  .then(() => {
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
