  
/**
 * Configuraciones de servidor
 */

const presetEnv = require('@babel/preset-env')

require('@babel/register')({
  presets: [presetEnv],
});

require('./src/server');