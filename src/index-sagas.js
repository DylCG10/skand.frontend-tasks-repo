import { all } from 'redux-saga/effects';
import LoginSaga from './login/sagas';
import WidgetSaga from './widgets/sagas';

export default function* IndexSagas() {
    yield all ([
        LoginSaga(),
        WidgetSaga(),
    ]);
}