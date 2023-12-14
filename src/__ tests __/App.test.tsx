// App.test.tsx
import '@testing-library/jest-dom'
import { render } from "@testing-library/react"
import Loader from '../../utlis/Loader'
import App from '../App'


test("Renders the page", () => {
    render(<Loader loaded={false} onlySpinner={false} />)
    expect(true).toBeTruthy()
})


test("Renders the page", () => {
    render(<App />)
    expect(true).toBeTruthy()
})

jest.mock('@syncfusion/ej2-react-grids', () => ({
    GridComponent: () => <div>Mock GridComponent</div>,
    ColumnsDirective: () => <div>Mock ColumnsDirective</div>,
    ColumnDirective: () => <div>Mock ColumnDirective</div>,
    Inject: () => <div>Mock ColumnDirective</div>,
}));