import { set,get, pick, values, concat } from 'lodash'

export const normalizeData = (collection, firstLevelKey, secondLevelKey) => {
    const firstLevelKeyCollection = new Set();
    const secondLevelKeyCollection = new Set();

    const result = collection.reduce( (res, { [firstLevelKey]: firstLevel, [secondLevelKey]: secondLevel, ...rest }) => {
        firstLevelKeyCollection.add(firstLevel);
        secondLevelKeyCollection.add(secondLevel);
        set(res, [firstLevel, secondLevel], concat(get(res, [firstLevel, secondLevel], []), [rest]));
        return res
    }, {});
    return ({
        result,
        [firstLevelKey]: Array.from(firstLevelKeyCollection),
        [secondLevelKey]: Array.from(secondLevelKeyCollection)
    })
};

export const optionCreator = options => options.map(item => ({ value: item, label: item}));

export const findData = (dataBase,
    { firstLevelValues, secondLevelValue },
    { firstLevelOptions, secondLevelOptions }
) => {
    const first = firstLevelValues && !!firstLevelValues.length ? firstLevelValues : firstLevelOptions;
    const second = secondLevelValue  && !!secondLevelValue.length ? secondLevelValue : secondLevelOptions;
    return first.reduce((res, el) => {
        return concat(res, ...values(pick(dataBase[el], second)))
    }, [])
}