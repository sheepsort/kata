export class TimeDivision {
    start: number;
    end: number;
    /**
     * EV is the expected value for time worked, and will be calculated using a base pay rate found in the constants helper class.
     * This circumvents the need to update each family's pay rate should they change, as we don't have a DB we can simple insert into.
     */
    EV: number;
}