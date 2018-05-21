/**
 * @file index.js
 * Exports all components.
 */

import LoginForm from './LoginForm/LoginForm.container';
import Loading from './Loading/Loading';
import FormLoading from './FormLoading/FormLoading';
import FormMessage from './FormMessage/FormMessage';
import PrivateRoute from './PrivateRoute/PrivateRoute.container';
import PublicRoute from './PublicRoute/PublicRoute.container';

export {
  LoginForm,
  Loading,
  FormLoading,
  FormMessage,
  PrivateRoute,
  PublicRoute
};
