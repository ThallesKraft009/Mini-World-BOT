const secret = require("./src/config/secret.js");
const c = require("colors");
const clusters = require("./src/config/clusters.js")
const { ClusterManager } = require('discord-hybrid-sharding');

module.exports = class MiniWorldBOT {
  constructor(){

this.manager = new ClusterManager(`${__dirname}/src/gateway/MiniWorldBOT.js`, {
    totalShards: 1,
    shardsPerClusters: 1,
    totalClusters: 1,
    mode: 'process',
    token: secret.token,
});

  this.manager.on('clusterCreate', cluster => {
  console.log(c.green(`Cluster [${cluster.id}] - "${clusters[cluster.id]}" iniciada.`));
})

  }
  
  async start(){
    
this.manager.spawn({ timeout: -1 });
    
  }
}