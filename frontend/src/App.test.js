import { render, screen } from '@testing-library/react';
import App from './App';
import NavBar from './nav/NavBar';
import { MemoryRouter } from 'react-router-dom';


test('render without crashing', () => {
  render(
  <MemoryRouter><App /></MemoryRouter>);
});


// it('render nav without crashing', () => {
//   const { getByText } = render(
//     <MemoryRouter>
//       <NavBar />
//     </MemoryRouter>
//   );
//   expect(getByText('Jobly')).toBeInTheDocument();
//   expect(getByText('Login')).toBeInTheDocument();
// });