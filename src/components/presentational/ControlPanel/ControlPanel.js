import React from 'react'
import styles from './ControlPanel.module.css'
import { Select } from '../../common/Select/Select'
export const ControlPanel = ({
                                 dataSourceOptions,
                                 dataCampaignOptions,
                                 currentSource,
                                 currentCampaign,
                                 sourceOnChange,
                                 campaignOnChange,
                                 onSubmit
                             }) => <aside className={styles['ControlPanel']}>
    <h1>{'ControlPanel'}</h1>
    <div className={styles['content']}>
        <Select
            options={dataSourceOptions}
            isMulti
            label={'Data source: '}
            onChange={sourceOnChange}
            isSearchable
            defaultValue={currentSource}
        />
        <Select
            options={dataCampaignOptions}
            isMulti
            label={'Data Campaign: '}
            onChange={campaignOnChange}
            isSearchable
            defaultValue={currentCampaign}
        />
        <button onClick={onSubmit}>{'Apply'}</button>
    </div>
</aside>