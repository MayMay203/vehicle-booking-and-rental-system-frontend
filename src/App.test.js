import { render} from '@testing-library/react';
import App from './App'
import UserProvider from './Context/UserProvider'
import { Provider } from 'react-redux'
import { store } from './redux/store'

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <UserProvider>
        <App />
      </UserProvider>
    </Provider>,
  )
})
