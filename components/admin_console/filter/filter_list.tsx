// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {FilterOption, FilterValues} from './filter';
import FilterCheckbox from './filter_checkbox';

import './filter.scss';

type Props = {
    option: FilterOption;
    optionKey: string;
    updateValues: (values: FilterValues, optionKey: string) => void;
}

class FilterList extends React.PureComponent<Props> {
    public constructor(props: Props) {
        super(props);
    }

    updateOption = async (value: boolean, key: string) => {
        const values = {...this.props.option.values}
        values[key].value = value;
        await this.props.updateValues(values, this.props.optionKey);
        this.forceUpdate(); // hack figure out a better solution?
    }

    render() {
        const {option} = this.props;
        const valuesToRender = option.keys.map((key: string) => {
            const currentValue = option.values[key];
            const {value, name} = currentValue;
            const FilterItem = option.type || FilterCheckbox;

            return (
                <div className='FilterList_item'>
                    <FilterItem
                        key={key}
                        name={key}
                        checked={value}
                        label={name}
                        updateOption={this.updateOption}
                    />
                </div>
            );
        });

        return (
            <div className='FilterList'>
                <div className='FilterList_name'>
                    {option.name}
                </div>

                {valuesToRender}
            </div>
        );
    }

}

export default FilterList;