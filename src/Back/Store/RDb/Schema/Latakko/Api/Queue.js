/**
 *  Metadata for RDB table: oc_latakko_api_queue.
 *  @namespace Ab_Clean_Back_Store_RDb_Schema_Latakko_Api_Queue
 */
// MODULE'S VARS
const NS = 'Ab_Clean_Back_Store_RDb_Schema_Latakko_Api_Queue';
/**
 * Path to the entity in plugin's DEM.
 * @type {string}
 */
const ENTITY = '/oc/latakko/api/queue';

/**
 * These are the attributes used in this app.
 * @memberOf Ab_Clean_Back_Store_RDb_Schema_Latakko_Api_Queue
 * @type {Object}
 */
const ATTR = {
    DATE_PROCESSED: 'date_processed',
    ID: 'id',
    IS_PROCESSED: 'is_processed',
};
Object.freeze(ATTR);

// MODULE'S CLASSES
/**
 * @memberOf Ab_Clean_Back_Store_RDb_Schema_Latakko_Api_Queue
 */
class Dto {
    static namespace = NS;
    /**
     * @type {Date}
     */
    date_processed;
    /**
     * @type {number}
     */
    id;
    /**
     * @type {number}
     */
    is_processed;
}

// noinspection JSClosureCompilerSyntax
/**
 * @implements TeqFw_Db_Back_RDb_Meta_IEntity
 */
export default class Ab_Clean_Back_Store_RDb_Schema_Latakko_Api_Queue {
    /**
     * @param {Ab_Clean_Back_Defaults} DEF
     * @param {TeqFw_Db_Back_RDb_Schema_EntityBase} base
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     */
    constructor(
        {
            Ab_Clean_Back_Defaults$: DEF,
            TeqFw_Db_Back_RDb_Schema_EntityBase$: base,
            TeqFw_Core_Shared_Util_Cast$: cast,
        }
    ) {
        // INSTANCE METHODS
        /**
         * @param {Ab_Clean_Back_Store_RDb_Schema_Latakko_Api_Queue.Dto} [data]
         * @return {Ab_Clean_Back_Store_RDb_Schema_Latakko_Api_Queue.Dto}
         */
        this.createDto = function (data) {
            const res = new Dto();
            res.date_processed = cast.date(data?.date_processed);
            res.id = cast.int(data?.id);
            res.is_processed = cast.int(data?.is_processed);
            return res;
        };

        /**
         * Set JSDoc return type, real code is in `TeqFw_Db_Back_RDb_Schema_EntityBase`.
         * @return {typeof Ab_Clean_Back_Store_RDb_Schema_Latakko_Api_Queue.ATTR}
         */
        this.getAttributes = function () {};

        // MAIN
        return base.create(this,
            `${DEF.NAME}${ENTITY}`,
            ATTR,
            [ATTR.ID],
            Dto
        );
    }
}

