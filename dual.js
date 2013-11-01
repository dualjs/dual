module.exports = {
    Object: require('./lib/Object'),
    Node: require('./lib/Node'),
    Widget: require('./lib/Widget'),
    List: require('./lib/List'),
    Container: require('./lib/Container'),
    fromJSON : require('./lib/fromJSON'),
    utils: require('./lib/utils'),
    factory: require('./lib/defaultFactory'),
    field: {
        Text : require('./lib/field/Text')
    },
    node: {
        Text : require('./lib/Node/Text'),
        Img : require('./lib/Node/Img'),
        Default : require('./lib/Node/Default'),
    }
};