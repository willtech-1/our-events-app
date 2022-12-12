import React from "react"
import App from './App';
// import renderer
import renderer from 'react-test-renderer';

// describe what we are doing
describe('snapshot testing', () => {
  // test mode to create the test
  test("snapshot for App Component", () => {
    const component = renderer.create(<App />).toJSON()
    // toMatchSnapshot() matcher function of the expect object
    expect(component).toMatchSnapshot()
  })
})





