import { takeLatest, put} from "redux-saga/effects";
import axios from 'axios'

function* fetchLeaderboard(action){
    const leaderboardData = yield axios.get(`/api/leaderboard/${action.payload}`)
    console.log('THe leaderboard Data:', leaderboardData.data);
    yield put({
        type:'LEADERBOARD_DATA',
        payload:leaderboardData.data
    })
}

function* fetchLeaderboardSaga(){
    yield takeLatest('GET_STATISTICS', fetchLeaderboard)
}

export default fetchLeaderboardSaga;