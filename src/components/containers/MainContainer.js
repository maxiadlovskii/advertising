import React, { useState, useEffect } from 'react';
import { fetchingStatuses } from '../../constatnts'
import { getServerData, calculateData } from '../../services/action-creator'
import { DATA_SERVICE, MAIN_API } from '../../constatnts/api'
import { dataModel } from '../../constatnts/models'
import {Main} from "../presentational/Main/Main";
import { normalizeData, optionCreator, findData } from '../../utils'

const MainContainer = () => {
    const [fetchingStatus, setFetchingStatus] = useState(fetchingStatuses.SUCCESS);
    const [dataSources, setDataSources] = useState([]);
    const [dataCampaigns, setDataCampaigns] = useState([]);
    const [currentSource, setCurrentSource] = useState(null);
    const [currentCampaign, setCurrentCampaign] = useState(null);
    const [dataBase, setData] = useState([]);
    const [graphData, setGraphData] = useState([]);
    const mapData = data => {
        const {
            [dataModel.DATA_SOURCE]: dataSource,
            [dataModel.CAMPAIGN]: campaign,
            result
        } = normalizeData(data, dataModel.DATA_SOURCE, dataModel.CAMPAIGN);
        setData(result);
        setDataSources(dataSource);
        setDataCampaigns(campaign);
    };
    const sourceOnChange = (value) => {
        setCurrentSource(value)
    };
    const campaignOnChange = (value) => {
        setCurrentCampaign(value)
    };
    const getDataForGraph = () => {
        const firstLevelValues = currentSource ? currentSource.map(el => el.value) : [];
        const secondLevelValue = currentCampaign ? currentCampaign.map(el => el.value) : [];
        return findData(
            dataBase,
            { firstLevelValues, secondLevelValue },
            {
                firstLevelOptions: dataSources,
                secondLevelOptions: dataCampaigns
            }
        );
    };
    const onSubmit = () => {
        calculateData({
            fetchingStatuses,
            statusChanger: setFetchingStatus,
            actionFunc: getDataForGraph,
            onSuccess: (data) => setGraphData(data)
        })
    };
    const getDataBase = () => {
        getServerData({
            fetchingStatuses,
            statusChanger: setFetchingStatus,
            onSuccess: mapData, // mapping of data could take some time, so let map data before flag became SUCCESS
            requestParams: {
                url: `${MAIN_API}${DATA_SERVICE}`
            }
        })
    };
    useEffect(()=> {
        getDataBase()
    }, []);

    return <Main
        fetchingStatus={fetchingStatus}
        graphData={graphData}
        dataSourceOptions={optionCreator(dataSources)}
        dataCampaignOptions={optionCreator(dataCampaigns)}
        currentSource={currentSource}
        currentCampaign={currentCampaign}
        sourceOnChange={sourceOnChange}
        campaignOnChange={campaignOnChange}
        onSubmit={onSubmit}
    />
}

export default MainContainer