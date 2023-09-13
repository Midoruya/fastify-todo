import autoLoad from '@fastify/autoload'
import fp from 'fastify-plugin';
import path from 'path';

const autoLoadPlugin = fp(async (server) => {
    server.register(autoLoad, {
    dir: path.join(__dirname),
    dirNameRoutePrefix: function (folderParent: string, folderName: string) {
      console.log(folderParent, folderName);
      return true;
    },
    indexPattern: /.*controller.(?:js|ts)/,
    ignorePattern: /.*(?:test|spec).(?:js|ts)/
  })
})

export default autoLoadPlugin