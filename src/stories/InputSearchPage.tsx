import React, {useState} from 'react';

import {List} from "./List";
import {InputSearch, InputSearchProps} from "./InputSearch";

export const InputSearchPage: React.VFC = ({
    startSearch,
    dataService,
    onSelectItem
                                           }: InputSearchProps) => {

    const [value, setValue] = useState('');
    const onKeyDown = (e) => {
        if (e.code === 'Enter') {
            dataService.add(value);
            setValue('');
        }
    }
    // useEffect(() => {
    //
    // }, [dataService.data])
    return (
        <article>



            <div className='test'>
                <InputSearch startSearch={startSearch} dataService={dataService} onSelectItem={onSelectItem}/>
            </div>
            <div>
                AllListData:
                <input placeholder='Print and Enter to Add' value={value} onChange={ (e) => setValue(e.target.value)} onKeyDown={onKeyDown}></input>
                <List items={dataService.data}></List>
            </div>

        </article>
    );
};