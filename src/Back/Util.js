/**
 * This is a set of pure functions to manipulate with dates and times.
 */
export default class Ab_Clean_Back_Util {

    constructor() {

        /**
         * Subtract days from given date or from now.
         * @param {number} days
         * @param {Date} [date]
         * @return {Date}
         */
        this.subtractDays = function (days, date) {
            const res = (date instanceof Date) ? new Date(date) : new Date();
            res.setDate(res.getDate() - Math.abs(days));
            return res;
        };

        /**
         * Convert local date to YYYY/MM/DD.
         * @param {Date|string|null} dateIn
         * @return {string}
         */
        this.formatDate = function (dateIn = null) {
            /** @type {Date} */
            const date = (dateIn) ?
                (dateIn instanceof Date) ? dateIn : new Date(dateIn) :
                new Date();
            const y = date.getFullYear();
            const m = `${date.getMonth() + 1}`.padStart(2, '0');
            const d = `${date.getDate()}`.padStart(2, '0');
            return `${y}/${m}/${d}`;
        };
    }
}
