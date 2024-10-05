import { render} from '@testing-library/react';
import App from './App';
import AuthModalProvider from './Context/AuthModalProvider'
import { UserProvider } from './Context/UserProvider/UserProvider'

test('renders learn react link', () => {
  render(
    <UserProvider>
      <AuthModalProvider>
        <App />
      </AuthModalProvider>
    </UserProvider>,
  )
})
