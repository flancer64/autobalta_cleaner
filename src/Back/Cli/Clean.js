/**
 * Clean up the expired data.
 * @namespace Ab_Clean_Back_Cli_Clean
 */
// DEFINE WORKING VARS
const NS = 'Ab_Clean_Back_Cli_Clean';

// DEFINE MODULE'S FUNCTIONS
function subtractDays(days, date) {
    const res = (date instanceof Date) ? new Date(date) : new Date();
    res.setDate(res.getDate() - Math.abs(days));
    return res;
}

/**
 * Factory to create CLI command.
 *
 * @param {Ab_Clean_Back_Defaults} DEF
 * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
 * @param {Ab_Clean_Back_Util} util
 * @param {TeqFw_Core_Back_Api_Dto_Command.Factory} fCommand
 * @param {TeqFw_Db_Back_RDb_IConnect} conn
 * @param {TeqFw_Db_Back_Api_RDb_CrudEngine} crud
 * @param {Ab_Clean_Back_Store_RDb_Schema_Latakko_Api_Log} rdbLatakkoApiLog
 * @param {Ab_Clean_Back_Store_RDb_Schema_Latakko_Api_Queue} rdbLatakkoApiQueue
 * @param {Ab_Clean_Back_Store_RDb_Schema_Latakko_Log} rdbLatakkoLog
 * @param {Ab_Clean_Back_Store_RDb_Schema_Session} rdbSession
 *
 * @returns {TeqFw_Core_Back_Api_Dto_Command}
 * @memberOf Ab_Clean_Back_Cli_Clean
 */
export default function Factory(
    {
        Ab_Clean_Back_Defaults$: DEF,
        TeqFw_Core_Shared_Api_Logger$$: logger,
        Ab_Clean_Back_Util$: util,
        'TeqFw_Core_Back_Api_Dto_Command.Factory$': fCommand,
        TeqFw_Db_Back_RDb_IConnect$: conn,
        TeqFw_Db_Back_Api_RDb_CrudEngine$: crud,
        Ab_Clean_Back_Store_RDb_Schema_Latakko_Api_Log$: rdbLatakkoApiLog,
        Ab_Clean_Back_Store_RDb_Schema_Latakko_Api_Queue$: rdbLatakkoApiQueue,
        Ab_Clean_Back_Store_RDb_Schema_Latakko_Log$: rdbLatakkoLog,
        Ab_Clean_Back_Store_RDb_Schema_Session$: rdbSession,
    }
) {
    // VARS
    const A_LA_API_LOG = rdbLatakkoApiLog.getAttributes();
    const A_LA_API_QUEUE = rdbLatakkoApiQueue.getAttributes();
    const A_LA_LOG = rdbLatakkoLog.getAttributes();
    const A_SESS = rdbSession.getAttributes();

    // FUNCS
    /**
     * Parse command line options and start server in requested mode.
     *
     * @param {Object} opts command options
     * @returns {Promise<void>}
     * @memberOf Ab_Clean_Back_Cli_Clean
     */
    const action = async function (opts) {
        // FUNCS

        /**
         * @param {<TeqFw_Db_Back_RDb_ITrans} trx
         * @return {Promise<number>}
         */
        async function cleanLatakkoApiLogs(trx) {
            const from = util.subtractDays(32);
            const date = util.formatDate(from);
            logger.info(`Clean up the Latakko API logs up to '${date}'.`);
            const where = function () {
                this.where(A_LA_API_LOG.DATE, '<', date);
            };
            const rows = await crud.deleteSet(trx, rdbLatakkoApiLog, where);
            logger.info(`Total '${rows}' log records were deleted.`);
            debugger
            return rows;
        }

        /**
         * @param {<TeqFw_Db_Back_RDb_ITrans} trx
         * @return {Promise<number>}
         */
        async function cleanLatakkoApiQueue(trx) {
            const from = util.subtractDays(32);
            const date = util.formatDate(from);
            logger.info(`Clean up the Latakko API queue up to '${date}'.`);
            const where = function () {
                this.where(A_LA_API_QUEUE.DATE_PROCESSED, '<', date);
                this.where(A_LA_API_QUEUE.IS_PROCESSED, '>', 0);
            };
            const rows = await crud.deleteSet(trx, rdbLatakkoApiQueue, where);
            logger.info(`Total '${rows}' queue records were deleted.`);
            debugger
            return rows;
        }

        /**
         * @param {<TeqFw_Db_Back_RDb_ITrans} trx
         * @return {Promise<number>}
         */
        async function cleanLatakkoLogs(trx) {
            const from = util.subtractDays(32);
            const date = util.formatDate(from);
            logger.info(`Clean up the Latakko logs up to '${date}'.`);
            const where = function () {
                this.where(A_LA_LOG.DATE, '<', date);
            };
            const rows = await crud.deleteSet(trx, rdbLatakkoLog, where);
            logger.info(`Total '${rows}' log records were deleted.`);
            debugger
            return rows;
        }

        /**
         * @param {<TeqFw_Db_Back_RDb_ITrans} trx
         * @return {Promise<number>}
         */
        async function cleanSessions(trx) {
            const from = util.subtractDays(45);
            const date = util.formatDate(from);
            logger.info(`Clean up the sessions been started before '${date}'.`);
            const where = function () {
                this.where(A_SESS.EXPIRE, '<', date);
            };
            const rows = await crud.deleteSet(trx, rdbSession, where);
            logger.info(`Total '${rows}' sessions were deleted.`);
            debugger
            return rows;
        }

        // MAIN
        logger.info('Start the cleaning.');
        // connect to DB and start the transaction
        const trx = await conn.startTransaction();
        try {
            await cleanSessions(trx);
            await cleanLatakkoLogs(trx);
            await cleanLatakkoApiLogs(trx);
            await cleanLatakkoApiQueue(trx);
            await trx.commit();
        } catch (e) {
            await trx.rollback();
            logger.exception(e);
        }
        await conn.disconnect();
    };
    Object.defineProperty(action, 'namespace', {value: NS});

    // COMPOSE RESULT
    const res = fCommand.create();
    res.realm = DEF.CLI_PREFIX;
    res.name = 'clean';
    res.desc = 'clean up the expired data';
    res.action = action;
    return res;
}

// finalize code components for this es6-module
Object.defineProperty(Factory, 'namespace', {value: NS});
