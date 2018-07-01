import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x4948C979A18696e4BEa2Ed3CdB52dBE5eceE283a'
);

export default instance;