import { all, fork } from 'redux-saga/effects';
import { appSaga } from './sagas/appSaga';
import { converterSaga } from './sagas/converterSaga';
import { historySaga } from './sagas/historySaga';

export function* rootSaga() {
  yield all([fork(appSaga), fork(converterSaga), fork(historySaga)]);
}
