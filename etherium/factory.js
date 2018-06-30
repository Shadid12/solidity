import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x25cd3f670971dF94f1C50f75787347A424c19325'
);

export default instance;