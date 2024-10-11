import { render} from '@testing-library/react';
import App from './App';
import AuthModalProvider from './Context/AuthModalProvider'
import { UserProvider } from './Context/UserProvider/UserProvider'
import ServiceModalProvider from './Context/ServiceModalProvider'

test('renders learn react link', () => {
  render(
    <UserProvider>
      <AuthModalProvider>
        <ServiceModalProvider>
          <App />
        </ServiceModalProvider>
      </AuthModalProvider>
    </UserProvider>,
  )
})
