const presets = require('@bem/sdk.naming.presets');
const reactPreset = presets.react;

/**
 * FIXME: able to do it cooler after
 *  - https://github.com/bem/bem-sdk/issues/292
 *  - https://github.com/bem/webpack-bem-plugin/issues/20#issuecomment-377930444
 */
presets.custom = {
    ...reactPreset,
    fs : {
        ...reactPreset.fs,
        pattern: 'blocks/${entity}.${tech}',
    }
};

module.exports = {
    root : true,
    levels : [{ naming: 'custom' }]
};
