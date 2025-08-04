import React from 'react'
import styles from './FailureAlert.module.css'
import {ReactComponent as InfoIcon} from 'assets/icons/infoIcon.svg'
function FailureAlert({message}) {
  return (
    <div className={styles['failure__header']}>
        <h2 className={styles['failure__header-title']}>
        <InfoIcon className={styles['failure__header-icon']}/> {message}
        </h2>
    </div>
  )
}

export default FailureAlert