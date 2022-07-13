// Changes the country of every player on a team to the second part of that team's name
// Works best for simulating the Olympics, as players on Team USA will have their country changed to USA, players on Team Canada will have it changed to Canada, etc.
var players = await bbgm.idb.cache.players.getAll();
for (const p of players) {
    if (p.tid >= 0) {
        const natTeam = bbgm.g.get("teamInfoCache")[p.tid].name;
        p.loc = natTeam;
        await bbgm.idb.cache.players.put(p);
    }
}