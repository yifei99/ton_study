// write your NFT miner here
import {Address, TonClient} from "ton"
import {getHttpEndpoint} from "@orbs-network/ton-access";  
import {BN} from 'bn.js'

async function main () {

    const wallet = Address.parse('0QBNEVhrrwAX6HCPVLivlCzkjSSlM20Jjej9lyHwJn9TOJyt');
    const collection = Address.parse('EQDk8N7xM5D669LC2YACrseBJtDyFqwtSPCNhRWXU7kjEptX');

    // 获取在测试网中的去中心化 RPC 端点
    const endpoint = await getHttpEndpoint({
        network: "testnet",
    });

    // 初始化 ton 库
    const client = new TonClient({ endpoint });

    // ... 先前的代码

    const miningData = await client.callGetMethod(collection, 'get_mining_data')

    console.log(miningData)

    const parseStackNum = (sn: any) => new BN(sn[1].substring(2), 'hex');

    const complexity = parseStackNum(miningData.stack[0]);
    const last_success = parseStackNum(miningData.stack[1]);
    const seed = parseStackNum(miningData.stack[2]);
    const target_delta = parseStackNum(miningData.stack[3]);
    const min_cpl = parseStackNum(miningData.stack[4]);
    const max_cpl = parseStackNum(miningData.stack[5]);

    console.log('complexity', complexity);
    console.log('last_success', last_success.toString());
    console.log('seed', seed);
    console.log('target_delta', target_delta.toString());
    console.log('min_cpl', min_cpl.toString());
    console.log('max_cpl', max_cpl.toString());

}

main()

