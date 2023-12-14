/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import './App.css';
import OverView from './OverViewTable';
import { registerLicense } from '@syncfusion/ej2-base'
registerLicense('ORg4AjUWIQA/Gnt2V1hhQlJAfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5Ud01jXX1ddHBRRmBe');

const App = (): JSX.Element => {
  React.useEffect(() => { }, [])
  return (
    <div>
      <div style={{ marginTop: '75px' }}>
        { /*<GridComponent
            id="overviewgrid"
            width={'1300px'}
            dataSource={todos}
            allowFiltering={true}
            allowSorting={true}
            allowSelection={true}
            allowResizing={true}
            toolbar={toolbarOptions}
            allowPaging={true}
            pageSettings={pageOptions}
            allowExcelExport={true}
            contextMenuItems={contextMenuItems}
            ref={GridInstance}
            beforeBatchSave={batchSaveFunction}
            editSettings={editing}
            selectionSettings={{ type: 'Multiple', mode: 'Both' }}
          >
            <ColumnsDirective>
              <ColumnDirective
                width={30}
                type="checkbox"
                allowSorting={false}
                allowFiltering={false}
              ></ColumnDirective>
              <ColumnDirective
                field="id"
                visible={false}
                headerText="ID"
                isPrimaryKey={true}
              ></ColumnDirective>
              <ColumnDirective
                field="userId"
                headerText="user ID"
              ></ColumnDirective>
              <ColumnDirective
                field="title"
                headerText="title"
              />
              <ColumnDirective
                field="completed"
                headerText="completed"
                type="checkbox"
              ></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, Toolbar, Search]} />
          </GridComponent>*/ }
        <div
          style={{
            width: '1300px'
          }}>
          <OverView />
        </div>
      </div>
    </div>
  );
}

export default App;
