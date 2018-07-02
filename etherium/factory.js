import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x3E36aEA0Ab3a8552Be1dc95981748AbE972dD406'
);

export default instance;