// if (process.env.NODE_ENV === 'production') {
//     module.exports = require('./Root.prod')
// } else {
//     module.exports = require('./Root.dev')
// }

export default process.env.NODE_ENV === 'production' 
    ? require('./Root.prod').default
    : require('./Root.dev').default