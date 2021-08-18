const playerResolvers = require("./playerResolver");
const teamResolvers = require("./teamResolver");
const matchResolvers = require("./matchResolver"); 
const userResolvers = require("./userResolver");
const inningsResolvers = require("./InningsResolvers");
const scorecardResolvers = require("./scorecardResolver");

const rootResolvers = {
    ...playerResolvers,
    ...teamResolvers,
    ...matchResolvers,
    ...userResolvers,
    ...inningsResolvers,
    ...scorecardResolvers
}

module.exports = rootResolvers;