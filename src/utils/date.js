import {
  addDays,
  eachDayOfInterval,
  endOfWeek,
  parseISO,
  startOfWeek
} from 'date-fns'

export const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export const getWeekDates = (weekInterval = 0) => {
  const date = addDays(new Date(), 7 * weekInterval)

  const weekDates = eachDayOfInterval({
    start: startOfWeek(date),
    end: endOfWeek(date)
  })

  return weekDates.map((date) => date.toISOString())
}

export const getCurrentMonthAndYear = (startOfWeekDate) => {
  const parsedDate = parseISO(startOfWeekDate)
  const dateInstance = new Date(parsedDate)
  const currentYear = dateInstance.getFullYear()
  const currentMonth = MONTHS[dateInstance.getMonth()]
  return { currentMonth, currentYear }
}
