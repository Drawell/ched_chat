import React from 'react'
import './Spin.css'

interface ISpinProps {
  show: boolean
  className?: string
  style?: React.CSSProperties
}

const Spin: React.FC<ISpinProps> = ({ show, className, style }) => {
  return (
    <>
      {show && (
        <div className={className + ' spin-holder'} style={style}>
          <span className='spin' />
        </div>
      )}
    </>
  )
}
export default Spin
