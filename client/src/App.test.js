import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from '../src/redux/reducer';
import { configure, mount } from "enzyme";

axios.defaults.adapter = require("axios/lib/adapters/http");

configure({ adapter: new Adapter() });

describe("<App />", () => {
  test('renders LandingPage when path is "/"', () => {
    const store = createStore(rootReducer);
    render(
      <Provider>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    
    // Verificar que LandingPage se renderiza cuando el path es "/"
    expect(screen.getByTestId('landing-page')).toBeInTheDocument();
  });
  
  test('renders NavBar when path is not "/"', () => {
    const store = createStore(rootReducer);
    render(
      <Provider>
        <MemoryRouter initialEntries={['/home']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    
    // Verificar que NavBar se renderiza cuando el path no es "/"
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });

});
