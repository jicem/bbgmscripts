// Schedule Evaluation Tool - A simpler version of the NCAA Evaluation Tool used to rank college basketball teams,
// this JavaScript code will calculate a SET number for each team based on win percentage, opponent win percentage,
// game result, and margin of wins and losses, with double-digit wins over quality opponents helping teams the most
// and double-digit losses to weak opponents hurting teams the most in the eyes of the SET
//
// Results will be printed to the JavaScript console in whichever browser the code is
// being run in and comma-separated to make exporting them to spreadsheet platforms easier

console.log("Team" + "," + "SET" + ",");
var teams = await bbgm.idb.cache.teams.getAll();
// create variables that will be assigned each team's wins and losses
let teamWins = 0;
let teamLosses = 0;
// variables for win percentage and SET value
let wp = 0;
let SET = 0;
// iterate through teams
for (const t of teams) {
	// grab team information from current season
	var teamSeason = await bbgm.idb.cache.teamSeasons.indexGet("teamSeasonsByTidSeason", [t.tid, bbgm.g.get("season")]);
	if (!teamSeason) {
		// Must be an inactive team
		continue;
	}
	teamWins = teamSeason.won;
	teamLosses = teamSeason.lost;
	// calculate the number of games played from wins and losses
	let numOfGames = teamWins + teamLosses;
	// calculate win percentage
	wp = teamWins/numOfGames;
	// part of the SET value is approximately 1/3 of the team's win percentage which is calculated here
	SET = 0.333 * wp;
	// create variables for the wins and losses of each opponent
	let oppWins = 0;
	let oppLosses = 0;
	// open database with games
	var games = await bbgm.idb.cache.games.getAll();
	// assign tid to value that will be checked during loop
	let checkTeam = t.tid;
	// create variable for the number that will be appended to the SET value
	let append = 0;
	// iterate through current team's games
	for (const g of games) {
	  // if the current team won this game
	  if(g.won.tid == checkTeam){
		// assign the tid of the losing team to oppSeason
		let oppSeason = await bbgm.idb.cache.teamSeasons.indexGet("teamSeasonsByTidSeason", [g.lost.tid, bbgm.g.get("season")]);
		// assign the opponent's wins and losses to oppWins and oppLosses
		oppWins = oppSeason.won;
		oppLosses = oppSeason.lost;
		// if the opponent's win percentage is less than .500
		if((oppWins/(oppWins + oppLosses)) < 0.5){
			// if the margin of victory is greater than 10 add .333 to append
			if((g.won.pts - g.lost.pts) > 10) {
				append += .333;
			}
			// if the margin of victory is between 6 and 10 add .222 to append
			else if((g.won.pts - g.lost.pts) > 5) {
				append += .222;
			}
			// if the margin of victory is between 1 and 5 add .111 to append
			else append += .111;
		}
		// if the opponent's win percentage is less than or equal to .500
		else{
			// if the margin of victory is greater than 10 add .666 to append
			if((g.won.pts - g.lost.pts) > 10) {
				append += .666;
			}
			// if the margin of victory is between 6 and 10 add .555 to append
			else if((g.won.pts - g.lost.pts) > 5) {
				append += .555;
			}
			// if the margin of victory is between 1 and 5 add .444 to append
			else append += .444;
		}
	  }
	  // if the current team lost this game
	  if(g.lost.tid == checkTeam){
		// assign the tid of the winning team to oppSeason
		oppSeason = await bbgm.idb.cache.teamSeasons.indexGet("teamSeasonsByTidSeason", [g.won.tid, bbgm.g.get("season")]);
		// assign the opponent's wins and losses to oppWins and oppLosses
		oppWins = oppSeason.won;
		oppLosses = oppSeason.lost;
		// if the opponent's win percentage is greater than .500
		if((oppWins/(oppWins + oppLosses)) > 0.5){
			// if the margin of victory is greater than 10 subtract .333 from append
			if((g.won.pts - g.lost.pts) > 10) {
				append -= .333;
			}
			// if the margin of victory is between 6 and 10 subtract .222 from append
			else if((g.won.pts - g.lost.pts) > 5) {
				append -= .222;
			}
			// if the margin of victory is between 1 and 5 subtract .111 from append
			else append -= .111;
		}
		// if the opponent's win percentage is less than or equal to .500
		else{
			// if the margin of victory is greater than 10 subtract .666 from append
			if((g.won.pts - g.lost.pts) > 10) {
				append -= .666;
			}
			// if the margin of victory is between 6 and 10 subtract .555 to append
			else if((g.won.pts - g.lost.pts) > 5) {
				append -= .555;
			}
			// if the margin of victory is between 1 and 5 subtract .444 to append
			else append -= .444;
		}
	  }
	}
	// average out the number to append after iterating through the games
	append = append/numOfGames;
	// append the number to the SET value
	SET += append;
	console.log(t.region + " " + t.name + "," + SET);
}
