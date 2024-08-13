import moment from 'moment'
export function expiry_maker() {

    return moment().add(5, 'days').toDate()
}
