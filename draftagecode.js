// Lowers the age of all draft prospects by 2
players = await bbgm.idb.cache.players.indexGetAll("playersByTid", bbgm.PLAYER.UNDRAFTED);
for (const p of players) {
    p.born.year += 2;

    // Recompute ovr and pot
    await bbgm.player.develop(p, 0);

    // Recompute player value
    await bbgm.player.updateValues(p);

    await bbgm.idb.cache.players.put(p);
}