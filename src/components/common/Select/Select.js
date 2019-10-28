import React from 'react'
import ReactSelect from 'react-select'
import styles from './Style.module.css'

export const Select = ({ options, label, ...rest}) => (
    <div className={styles['wrapper']}>
        {label && <label>{ label }</label>}
        <ReactSelect options={options} { ...rest}/>
    </div>
)