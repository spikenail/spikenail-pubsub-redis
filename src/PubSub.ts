import { RedisPubSub as RedisPubSub } from 'graphql-redis-subscriptions';
import * as Redis from 'ioredis';

export class PubSub {

    public pubsub: any;

    constructor(config: Object) {
        let defaults = {
            host: '127.0.0.1',
            port: '6379',
            retry_strategy: options => {
                // reconnect after
                return Math.max(options.attempt * 100, 3000);
            }
        };

        let options = Object.assign({}, defaults, config);

        this.pubsub = new RedisPubSub({
            connection: options
        });
    }

    /**
     * Publish data
     *
     * @param path
     * @param data
     * @returns {Promise<boolean>}
     */
    async publish(path: Array<string>, data: Object) {
        let topic = this.pathToChannel(path);
        return await this.pubsub.publish(topic, data);
    }

    /**
     * Path to channel
     *
     * @param path
     * @returns {string}
     */
    pathToChannel(path: Array<string>) {
        return path.join('.');
    }

    /**
     * Path to subscription channel
     *
     * @param path
     * @returns {string}
     */
    pathToSubscriptionChannel(path: Array<string>) {
        return path.join('.');
    }
}



