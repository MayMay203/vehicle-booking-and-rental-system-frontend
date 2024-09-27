import { render} from '@testing-library/react';
import App from './App';
import AuthModalProvider from './Context/AuthModalProvider'

test('renders learn react link', () => {
  render(
    <AuthModalProvider>
      <App />
    </AuthModalProvider>,
  )
});
