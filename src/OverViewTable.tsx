/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { closest, isNullOrUndefined } from '@syncfusion/ej2-base';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Filter, VirtualScroll, Sort, FilterSettingsModel, SelectionSettingsModel, Search, Edit, ExcelExport, ContextMenu, Resize, Toolbar, ContextMenuItem } from '@syncfusion/ej2-react-grids';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { RatingComponent } from '@syncfusion/ej2-react-inputs';
import './index.css';

import { DataManager, Query, UrlAdaptor } from '@syncfusion/ej2-data';

function statusTemplate(props: any) {
    return (<div>{props.Status === "Active" ?
        <div id="status" className="statustemp e-activecolor">
            <span className="statustxt e-activecolor">{props.Status}</span>
        </div> :
        <div id="status" className="statustemp e-inactivecolor">
            <span className="statustxt e-inactivecolor">{props.Status}</span>
        </div>}</div>);
}
function ratingTemplate(props: any) {
    return (<div><RatingComponent value={props.Rating} cssClass={'custom-rating'} readOnly={true} /></div>);
}
function progessTemplate(props: any) {
    let percentage = props[props.column.field];
    if (percentage <= 20) {
        percentage = percentage + 30;
    }
    return (<div id="myProgress" className="pbar">
        {props.Status === "Inactive" ?
            <div id="myBar" className="bar progressdisable" style={{ width: percentage + "%" }}>
                <div id="pbarlabel" className="barlabel">{percentage + "%"}</div>
            </div> :
            <div id="myBar" className="bar" style={{ width: percentage + "%" }}>
                <div id="pbarlabel" className="barlabel">{percentage + "%"}</div>
            </div>}
    </div>);
}
const loc = { width: '31px', height: '24px' };
function trustTemplate(props: { Trustworthiness: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined; }) {
    const Trustworthiness = props.Trustworthiness == "Sufficient" ? 'https://ej2.syncfusion.com/react/demos/src/grid/images/Sufficient.png' : props.Trustworthiness == "Insufficient" ? 'https://ej2.syncfusion.com/react/demos/src/grid/images/Insufficient.png' : 'https://ej2.syncfusion.com/react/demos/src/grid/images/Perfect.png';
    return (<div> <img style={loc} src={Trustworthiness} />
        <span id="Trusttext">{props.Trustworthiness}</span></div>);
}
function empTemplate(props: any) {
    return (<div>
        {props.EmployeeImg === 'usermale' ?
            <div className="empimg">
                <span className="e-userimg sf-icon-Male" />
            </div> :
            <div className="empimg">
                <span className="e-userimg sf-icon-FeMale" />
            </div>}
        <span id="Emptext">{props.Employees}</span>
    </div>);
}
function coltemplate(props: any) {
    return (<div className="Mapimage">
        <img src="https://ej2.syncfusion.com/react/demos/src/grid/images/Map.png" className="e-image" /> <span>  </span>
        <span id="locationtext">{props.Location}</span>
    </div>);
}
function OverView(this: any) {
    let dReady = false;
    let isDataChanged = true;
    let intervalFun: string | number | NodeJS.Timeout | undefined;
    let clrIntervalFun: string | number | NodeJS.Timeout | undefined;
    let clrIntervalFun2: string | number | NodeJS.Timeout | undefined;
    let DdObj: any;
    let GridInstance: GridComponent;
    let stTime: number | null;
    const ddlData = [
        { text: '1,000 Rows and 11 Columns', value: '1000' },
        { text: '10,000 Rows and 11 Columns', value: '10000' },
        { text: '1,00,000 Rows and 11 Columns', value: '100000' }
    ];
    const fields = { text: 'text', value: 'value' };
    function onDataBound() {
        clearTimeout(clrIntervalFun);
        clearInterval(intervalFun);
    }
    function onComplete(args: any) {
        if (args.requestType === "filterchoicerequest") {
            if (args.filterModel.options.field === "Trustworthiness" || args.filterModel.options.field === "Rating" || args.filterModel.options.field === "Status") {
                const span = args.filterModel.dialogObj.element.querySelectorAll('.e-selectall')[0];
                if (!isNullOrUndefined(span)) {
                    closest(span, '.e-ftrchk').classList.add("e-hide");
                }
            }
        }
    }
    const hostUrl = 'https://services.syncfusion.com/react/production/';
    const data = new DataManager({ url: hostUrl + 'api/UrlDataSource', adaptor: new UrlAdaptor });
    const query = new Query().addParams('dataCount', '1000');
    function onChange() {
        DdObj?.hidePopup();
        const index = DdObj?.value;
        clearTimeout(clrIntervalFun2);
        clrIntervalFun2 = setTimeout(() => {
            isDataChanged = true;
            stTime = null;
            const contentElement = GridInstance?.contentModule.getPanel().firstChild;
            (contentElement as any).scrollLeft = 0;
            (contentElement as any).scrollTop = 0;
            GridInstance.pageSettings.currentPage = 1;
            stTime = performance.now();
            if (GridInstance.query.params.length > 1) {
                for (let i = 0; i < GridInstance.query.params.length; i++) {
                    if (GridInstance.query.params[i].key === 'dataCount') {
                        GridInstance.query.params[i].value = index.toString();
                        break;
                    }
                }
            }
            else {
                GridInstance.query.params[0].value = index.toString();
            }
            GridInstance.setProperties({ dataSource: data });
        }, 100);
    }

    const select = {
        persistSelection: true,
        type: "Multiple",
        checkboxOnly: true
    };
    function onLoad() {
        (document as any).getElementById('overviewgrid').ej2_instances[0].on('data-ready', () => {
            dReady = true;
            stTime = performance.now();
        });
        (document as any).getElementById('overviewgrid').addEventListener('DOMSubtreeModified', () => {
            if (dReady && stTime && isDataChanged) {
                const msgEle = document.getElementById('msg');
                if (msgEle) {
                    const val = (performance.now() - stTime).toFixed(0);
                    stTime = null;
                    dReady = false;
                    isDataChanged = false;
                    (msgEle as any).innerHTML = 'Load Time: ' + "<b>" + val + "</b>" + '<b>ms</b>';
                    (msgEle as any).classList.remove('e-hide');
                }
            }
        });
    }
    const gridFilter = {
        type: 'Menu'
    };



    const toolbarOptions = ['Search'];
    const contextMenuItems: ContextMenuItem[] = [
        'AutoFit',
        'AutoFitAll',
        'SortAscending',
        'SortDescending',
        'Copy',
        'Edit',
        'Delete',
        'Save',
        'Cancel',
        'ExcelExport',
        'CsvExport',
        'FirstPage',
        'PrevPage',
        'LastPage',
        'NextPage',
    ];
    const editing = {
        allowDeleting: true,
        allowEditing: true,
        allowAdding: true,
        mode: 'Batch',
    };

    const batchSaveFunction = async (event: any) => {
        if (event?.batchChanges ?? false) {
            let changed = false;
            console.log(1)
            if (Array.isArray(event.batchChanges.addedRecords) && event.batchChanges?.addedRecords.length) {

                changed = true;
            }
            if (Array.isArray(event.batchChanges.changedRecords) && event.batchChanges?.changedRecords.length) {

                changed = true;
            }
            if (Array.isArray(event.batchChanges.deletedRecords) && event.batchChanges?.deletedRecords.length) {

                changed = true;
            }
            if (changed) {
                //
            }
        }
    };

    return (<div className='control-pane'>
        <div className='control-section'>
            <div style={{ paddingBottom: '18px' }}>
                <DropDownListComponent id="games" width='220' dataSource={ddlData} index={0} ref={(dropdownlist) => { DdObj = dropdownlist; }} fields={fields} change={onChange.bind(this)} placeholder="Select a Data Range" popupHeight="240px" />
                <span id='msg'></span>
                <br />
            </div>
            <GridComponent id="overviewgrid"
                dataSource={data}
                loadingIndicator={{ indicatorType: 'Shimmer' }}
                query={query}
                enableHover={false}
                enableVirtualization={true}
                rowHeight={38}
                height='400'
                ref={(g) => { GridInstance = g as GridComponent; }}
                actionComplete={onComplete.bind(this)}
                load={onLoad.bind(this)}
                dataBound={onDataBound.bind(this)}
                allowFiltering={true}
                allowSorting={true}
                allowSelection={true}
                filterSettings={gridFilter as FilterSettingsModel}
                selectionSettings={select as SelectionSettingsModel}
                enableHeaderFocus={true}
                allowResizing={true}
                toolbar={toolbarOptions}
                allowPaging={true}
                allowExcelExport={true}
                contextMenuItems={contextMenuItems}
                beforeBatchSave={batchSaveFunction}
                editSettings={editing}
            >
                <ColumnsDirective>
                    <ColumnDirective type='checkbox' allowSorting={false} allowFiltering={false} width='60'></ColumnDirective>
                    <ColumnDirective field='EmployeeID' visible={false} headerText='Employee ID' isPrimaryKey={true} width='130'></ColumnDirective>
                    <ColumnDirective field='Employees' headerText='Employee Name' width='230' clipMode='EllipsisWithTooltip' template={empTemplate} />
                    <ColumnDirective field='Designation' headerText='Designation' width='170' clipMode='EllipsisWithTooltip' />
                    <ColumnDirective field='Mail' headerText='Mail' width='230'></ColumnDirective>
                    <ColumnDirective field='Location' headerText='Location' width='140' template={coltemplate}></ColumnDirective>
                    <ColumnDirective field='Status' headerText='Status' template={statusTemplate} width='130'></ColumnDirective>
                    <ColumnDirective field='Trustworthiness' headerText='Trustworthiness' template={trustTemplate} width='160'></ColumnDirective>
                    <ColumnDirective field='Rating' headerText='Rating' template={ratingTemplate} width='220' />
                    <ColumnDirective field='Software' allowFiltering={false} allowSorting={false} headerText='Software Proficiency' width='180' template={progessTemplate} format='C2' />
                    <ColumnDirective field='CurrentSalary' headerText='Current Salary' width='160' format='C2'></ColumnDirective>
                    <ColumnDirective field='Address' headerText='Address' width='240' clipMode="EllipsisWithTooltip"></ColumnDirective>
                </ColumnsDirective>
                <Inject services={[Filter, VirtualScroll, Sort, Resize, ContextMenu, ExcelExport, Edit, Toolbar, Search]} />
            </GridComponent>
        </div>
        <style>
            @import 'https://ej2.syncfusion.com/react/demos/src/grid/Grid/style.css';
        </style>
    </div>);
}
export default OverView;