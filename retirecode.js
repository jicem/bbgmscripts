// Retires every player over 17 (intended for a high school league)
players = await bbgm.idb.cache.players.getAll();
for (const p of players) {
    const age = bbgm.g.get("season") - p.born.year;
    if (age > 17) {
        // retirement tid
        p.tid = -3;
    }
    // saves to cache
    await bbgm.idb.cache.players.put(p);
}