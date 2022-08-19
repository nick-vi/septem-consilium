import { createSlice } from '@reduxjs/toolkit'
import { getCurrentMonthAndYear, getWeekDates, MONTHS } from '../../utils/date'

const initialState = {
  distanceFromThisWeek: 0,
  currentMonth: MONTHS[new Date().getMonth()],
  currentYear: new Date().getFullYear(),
  dates: getWeekDates()
}

const getDateUpdate = (state) => {
  const dates = getWeekDates(state.distanceFromThisWeek)
  const { currentMonth, currentYear } = getCurrentMonthAndYear(state.dates[0])
  return { currentMonth, currentYear, dates }
}

const navigationGenerator = (state, operation) => {
  // operations
  // integers for incrementing or decrementing distance from this week
  // zero for resetting distance to this week
  operation ? state.distanceFromThisWeek += operation : state.distanceFromThisWeek = 0
  const { currentMonth, currentYear, dates } = getDateUpdate(state)
  state.currentMonth = currentMonth
  state.currentYear = currentYear
  state.dates = dates
}

export const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    nextWeek: (state) => navigationGenerator(state, 1),
    previousWeek: (state) => navigationGenerator(state, -1),
    resetWeek: (state) => navigationGenerator(state, 0)
  }
})

export const selectDateByIndex = (columnDateIndex) => (state) => state.date.dates[columnDateIndex]
export const selectDistanceFromThisWeek = (state) => state.date.distanceFromThisWeek
export const selectCurrentWeekDates = (state) => state.date.dates

export const {
  nextWeek,
  previousWeek,
  resetWeek
} = dateSlice.actions

export default dateSlice.reducer
