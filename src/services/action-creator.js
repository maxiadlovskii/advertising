import {getData} from "./transports";
const dispatcher = async ({
                        actionParams,
                        fetchingStatuses,
                        onSuccess,
                        statusChanger
                    }, actionFunc) => {
    statusChanger(fetchingStatuses.FETCHING);
    try{

        const data = await actionFunc(actionParams);
        await onSuccess(data);
        setTimeout( ()=>statusChanger(fetchingStatuses.SUCCESS), 500);
    } catch (e) {
        statusChanger(fetchingStatuses.FAILED);
        return e
    }
};


export const getServerData = async ({
                            statusChanger,
                            requestParams,
                            fetchingStatuses,
                            onSuccess
                             }) => {
    return dispatcher({
        statusChanger,
        actionParams: requestParams,
        fetchingStatuses,
        onSuccess
    }, getData)
};

export const calculateData = async ({
                                        statusChanger,
                                        fetchingStatuses,
                                        actionFunc,
                                        onSuccess
}) => {
    return dispatcher({
        statusChanger,
        fetchingStatuses,
        onSuccess
    }, actionFunc)
};