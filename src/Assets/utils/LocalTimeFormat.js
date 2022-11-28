import moment from 'moment';

export function getLocalTime(time){
    let localTime=""
    localTime =  moment?.utc(time)?.local().format("DD-MM-yyyy")
    return localTime !==""?localTime : moment?.utc(new Date())?.local().format("DD-MM-yyyy");
}

export function getLocalDateWithTime(date){
    let localTime=""
    localTime =  moment?.utc(date)?.local().format("DD-MM-yyyy hh:mm A")
    return localTime !==""?localTime : moment?.utc(new Date())?.local().format("DD-MM-yyyy hh:mm A");
}
