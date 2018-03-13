export function countdown(days) {

  var startTime = new Date()

  var daysNeeded = days.filter(function (item) {
    return item > startTime.getDay()
  })
  var endTimeDate = new Date((daysNeeded[0] - startTime.getDay()) * 24 * 3600 * 1000 + startTime.valueOf())
  var endTimeString = endTimeDate.getFullYear() + '/' + (endTimeDate.getMonth() + 1) + '/' + endTimeDate.getDate()
  // console.log(endTimeString)
  // console.log(daysNeeded)

  var endTime = new Date(endTimeString)
  var timeInterval = endTime - startTime

  var days = Math.floor(timeInterval / (24 * 3600 * 1000))

  var leave1 = timeInterval % (24 * 3600 * 1000)
  var hours = Math.floor(leave1 / (3600 * 1000))

  var leave2 = leave1 % (3600 * 1000)
  var minutes = Math.floor(leave2 / (60 * 1000))

  var leave3 = leave2 % (60 * 1000)
  var seconds = Math.round(leave3 / 1000)
  // console.log(`days: ${days} hours: ${hours} minutes: ${minutes} seconds: ${seconds}`)

  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  }
}
