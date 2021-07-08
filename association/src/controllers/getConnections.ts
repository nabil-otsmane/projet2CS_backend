import { RedisClient } from "redis";

export default function (redis: RedisClient | undefined) {
    if (redis === undefined)
        return new Promise<string[]>((_, reject) => reject(["Please check the connection to redis."]));

    return new Promise<string[]>(function (resolve, reject) {
        redis.smembers("connections", function(err, connections: string[]) {
            if (err) {
                reject([err.message]);
            }
            resolve(connections)
        })
    });
}