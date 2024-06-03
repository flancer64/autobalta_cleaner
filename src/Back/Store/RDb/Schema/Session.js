/**
 *  Metadata for RDB table: oc_session.
 *  @namespace Ab_Clean_Back_Store_RDb_Schema_Session
 */
// MODULE'S VARS
const NS = 'Ab_Clean_Back_Store_RDb_Schema_Session';
/**
 * Path to the entity in plugin's DEM.
 * @type {string}
 */
const ENTITY = '/oc/session';

/**
 * These are the attributes used in this app.
 * @memberOf Ab_Clean_Back_Store_RDb_Schema_Session
 * @type {Object}
 */
const ATTR = {
    EXPIRE: 'expire',
};
Object.freeze(ATTR);

// MODULE'S CLASSES
/**
 * @memberOf Ab_Clean_Back_Store_RDb_Schema_Session
 */
class Dto {
    static namespace = NS;
    /**
     * @type {Date}
     */
    expire;
}

// noinspection JSClosureCompilerSyntax
/**
 * @implements TeqFw_Db_Back_RDb_Meta_IEntity
 */
export default class Ab_Clean_Back_Store_RDb_Schema_Session {
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
         * @param {Ab_Clean_Back_Store_RDb_Schema_Session.Dto} [data]
         * @return {Ab_Clean_Back_Store_RDb_Schema_Session.Dto}
         */
        this.createDto = function (data) {
            const res = new Dto();
            res.expire = cast.date(data?.expire);
            return res;
        };

        /**
         * Set JSDoc return type, real code is in `TeqFw_Db_Back_RDb_Schema_EntityBase`.
         * @return {typeof Ab_Clean_Back_Store_RDb_Schema_Session.ATTR}
         */
        this.getAttributes = function () {};

        // MAIN
        return base.create(this,
            `${DEF.NAME}${ENTITY}`,
            ATTR,
            [],
            Dto
        );
    }
}

