// Prints the average team ovr at the end of the regular season to the console
var teams = await bbgm.idb.cache.teams.getAll();
let numOfTeams = 0;
let avgOvr = 0;
for (const t of teams) {
  var teamSeason = await bbgm.idb.cache.teamSeasons.indexGet("teamSeasonsByTidSeason", [t.tid, bbgm.g.get("season")]);
  avgOvr += teamSeason.ovrEnd;
  numOfTeams++;
  await bbgm.idb.cache.teamSeasons.put(teamSeason);
}
avgOvr = avgOvr/numOfTeams;
console.log("Average team ovr at the end of the season: " + avgOvr);