import React from 'react'
import Icon from '@mdi/react'
import { mdiLoading } from '@mdi/js';

const LoadingScreen = () => {
  return (
    <div className="loading">
        <Icon path={mdiLoading}
        title="Loading"
        className="loading-icon"
        color="#0084ff"
        spin/>
    </div>
  )
}

export default LoadingScreen