import { render} from '@testing-library/react';
import App from './App';
import AuthModalProvider from './Context/AuthModalProvider'
import UserProvider from './Context/UserProvider';
import ServiceModalProvider from './Context/ServiceModalProvider'
import GlobalModalProvider from './Context/GlobalModalProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';

test('renders learn react link', () => {
  render(
   <GoogleOAuthProvider>
      <GlobalModalProvider>
        <UserProvider>
          <AuthModalProvider>
            <ServiceModalProvider>
              <App />
            </ServiceModalProvider>
          </AuthModalProvider>
        </UserProvider>,
      </GlobalModalProvider>
   </GoogleOAuthProvider>
  )
})
