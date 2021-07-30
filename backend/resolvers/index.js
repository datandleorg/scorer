const playerResolvers = require("./playerResolver");
const teamResolvers = require("./teamResolver");
const matchResolvers = require("./matchResolver"); 
const userResolvers = require("./userResolver");

const rootResolvers = {
    ...playerResolvers,
    ...teamResolvers,
    ...matchResolvers,
    ...userResolvers
}

module.exports = rootResolvers;