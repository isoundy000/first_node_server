/**
 * Created by Administrator on 2018/9/14.
 */
App.CUtil = {
    sleep:function (time = 0) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, time);
        })
    }
}