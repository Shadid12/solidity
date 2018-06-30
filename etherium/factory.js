import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x08ABD981C0E61FEBcd2a870DD4E54988e90ea54d'
);

export default instance;