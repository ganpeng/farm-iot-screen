import _ from 'lodash';
import router from './routers'
// import util from '../util/';

// let authRouterList = ['Home', 'Sale', 'FarmStock', 'Storage', 'Internet'];
// let authPathList = ['/home/index', '/farmstock/index', '/sale/index', '/storage/index', '/internet/index'];

router.beforeEach((to, from, next) => {
    next();
    // let user = util.store.getLocal('login');
    // if (to.name === 'PcSpread' || to.name === 'AAA') {
    //     next();
    // } else {
    //     if (!_.get(user, 'token')) {
    //         if (to.name !== 'Login') {
    //             next({name: 'Login'});
    //         } else {
    //             next();
    //         }
    //     } else {
    //         if (to.name === 'Login') {
    //             next({name: 'Home'});
    //         } else {
    //             let roleType = _.get(user, 'roleType');
    //             if ( roleType === 'FARM_OWNER' || roleType === 'FARM_EMPLOYEE') {
    //                 if (_.includes(authPathList, to.path)) {
    //                     let farmId = _.get(user, 'farmId')
    //                     next({name: 'FarmStockSurvey', params:{ id: farmId}});
    //                 } else {
    //                     let farmId = _.get(user, 'farmId')
    //                     let id = _.get(to, 'params.id');
    //                     if (_.toString(id) !== _.toString(farmId)) {
    //                         next({name: 'FarmStockSurvey', params:{ id: farmId}});
    //                     } else {
    //                         next();
    //                     }
    //                 }
    //             } else {
    //                 next();
    //             }
    //         }
    //     }
    // }
});

router.afterEach(() => {
});

export default router;
