import React, { forwardRef } from 'react'
import ReactDatePicker from 'react-datepicker'
import './styles/datepicker.scss'
// import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from '../../assets/icons/CalendarIcon'
import styles from './DatePicker.module.scss'

const DATE_FORMAT = 'EEE, MMM d yyyy'

const DatePicker = ({ placeholder, ...props }) => {
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <div ref={ref}>
      <CalendarIcon className={styles['date-picker__icon']} onClick={onClick} />
      <span className={styles['date-picker__text']} onClick={onClick}>
        {typeof placeholder === 'string' ? placeholder : value}
      </span>
    </div>
  ))
  return (
    <ReactDatePicker
      dateFormat={DATE_FORMAT}
      wrapperClassName={styles['date-picker']}
      customInput={<CustomInput />}
      showPopperArrow={false}
      {...props}
    />
  )
}

export default DatePicker
