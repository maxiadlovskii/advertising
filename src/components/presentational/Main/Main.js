import React from 'react'
import { Loader } from "../../common/Loader/Loader";
import { fetchingStatuses } from '../../../constatnts'
import styles from './Main.module.css'
import {ControlPanel} from "../ControlPanel/ControlPanel";
import {Graph} from "../Graph/Graph";

export const Main = ({
                         fetchingStatus,
                         graphData,
                         dataSourceOptions,
                         dataCampaignOptions,
                         currentSource,
                         currentCampaign,
                         sourceOnChange,
                         campaignOnChange,
                         onSubmit
}) => {
    const isFetching = fetchingStatus === fetchingStatuses.FETCHING;
    return (
        <>
            {
                isFetching
                    ? <Loader/>
                    : <div className={styles['content']}>
                        <div className={styles['box']}>
                            <ControlPanel
                                dataSourceOptions={dataSourceOptions}
                                dataCampaignOptions={dataCampaignOptions}
                                currentSource={currentSource}
                                currentCampaign={currentCampaign}
                                sourceOnChange={sourceOnChange}
                                campaignOnChange={campaignOnChange}
                                onSubmit={onSubmit}
                            />
                        </div>
                        <div className={styles['box']}>
                            <Graph graphData={graphData}/>
                        </div>
                    </div>

            }
        </>
    )
}