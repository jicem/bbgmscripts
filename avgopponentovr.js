// Prints the average ovr of a particular team's opponent to the console (in this example it's a team with a tid of 2)
var games = await bbgm.idb.cache.games.getAll();
let checkTeam = 2;
let gamesPlayed = 0;
let oppOvr = 0;
for (const g of games) {
  if(g.won.tid == checkTeam || g.lost.tid == checkTeam){
    gamesPlayed++;
    if(g.teams[0].tid == checkTeam) {
        oppOvr += g.teams[1].ovr;
    }
    else oppOvr += g.teams[0].ovr;
  }
}
console.log("Average ovr of team's opponent: " + oppOvr/gamesPlayed);