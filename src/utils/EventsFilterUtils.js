import moment from "moment";

export function sortEventsArray(array) {
  let sortedArray = array.sort(function (a, b) {
    var keyA = new Date(a.eventDate),
      keyB = new Date(b.eventDate);
    // Compare the 2 dates
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });

  console.log(sortedArray);
  return array;
}

export function filterUpcomingEvents(date, array) {
  let filterDate = moment.utc(date, "DD-MM-YYYY");
  let filteredArray = array.filter((item) => {
    let eventDate = moment.utc(item.eventDate);
    if (eventDate.isAfter(filterDate)) {
      return true;
    }

    return false;
  });

  return filteredArray;
}

export function filterEventsHappeneingThisWeek(array) {
  var now = moment();
  var monday = now.clone().weekday(1);
  var sunday = now.clone().weekday(7);

  
  let filteredArray = array.filter((item) => {
    let eventDate = moment.utc(item.eventDate);
    if (eventDate.isBetween(monday, sunday, null , '[]')) {
      return true;
    }

    return false;
  });

  return filteredArray;
}

export function filterEventsinDateRange(start, end, array) {
  let startDate = moment.utc(start, "DD-MM-YYYY");
  let endDate = moment.utc(end, "DD-MM-YYYY");
  let filteredArray = array.filter((item) => {
    let eventDate = moment.utc(item.eventDate);
    if (eventDate.isAfter(startDate) && eventDate.isBefore(endDate)) {
      return true;
    }

    return false;
  });

  return filteredArray;
}
