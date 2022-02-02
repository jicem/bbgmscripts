// Decreases each of a player's ratings by different amount
players = await bbgm.idb.cache.players.getAll();
for (const p of players) {
  const ratings = p.ratings[p.ratings.length - 1];
  ratings.stre -= 15;
  ratings.spd -= 15;
  ratings.jmp -= 15;
  ratings.endu -= 35;
  ratings.ins -= 25;
  ratings.dnk -= 25;
  ratings.ft -= 25;
  ratings.fg -= 25;
  ratings.tp -= 35;
  ratings.oiq -= 45;
  ratings.diq -= 45;
  ratings.drb -= 35;
  ratings.pss -= 35;
  ratings.reb -= 25;
  await bbgm.player.develop(p, 0);
  await bbgm.player.updateValues(p);
  await bbgm.idb.cache.players.put(p);
}