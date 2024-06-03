/**
 *  Metadata for RDB table: oc_latakko_log.
 *  @namespace Ab_Clean_Back_Store_RDb_Schema_Latakko_Log
 */
// MODULE'S VARS
const NS = 'Ab_Clean_Back_Store_RDb_Schema_Latakko_Log';
/**
 * Path to the entity in plugin's DEM.
 * @type {string}
 */
const ENTITY = '/oc/latakko/log';

/**
 * These are the attributes used in this app.
 * @memberOf Ab_Clean_Back_Store_RDb_Schema_Latakko_Log
 * @type {Object}
 */
const ATTR = {
    DATE: 'date',
    ID: 'id',
};
Object.freeze(ATTR);

// MODULE'S CLASSES
/**
 * @memberOf Ab_Clean_Back_Store_RDb_Schema_Latakko_Log
 */
class Dto {
    static namespace = NS;
    /**
     * @type {Date}
     */
    date;
    /**
     * @type {number}
     */
    id;
}

// noinspection JSClosureCompilerSyntax
/**
 * @implements TeqFw_Db_Back_RDb_Meta_IEntity
 */
export default class Ab_Clean_Back_Store_RDb_Schema_Latakko_Log {
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
         * @param {Ab_Clean_Back_Store_RDb_Schema_Latakko_Log.Dto} [data]
         * @return {Ab_Clean_Back_Store_RDb_Schema_Latakko_Log.Dto}
         */
        this.createDto = function (data) {
            const res = new Dto();
            res.date = cast.date(data?.date);
            res.id = cast.int(data?.id);
            return res;
        };

        /**
         * Set JSDoc return type, real code is in `TeqFw_Db_Back_RDb_Schema_EntityBase`.
         * @return {typeof Ab_Clean_Back_Store_RDb_Schema_Latakko_Log.ATTR}
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

