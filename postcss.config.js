/**
 * Created by songyingchun on 2017/7/19.
 */
module.exports = {
    // parser: "sugarss",
    plugins: {
        "postcss-import": {},
        "postcss-cssnext": {},
        "autoprefixer": {},
        "cssnano": {},
        "postcss-px2rem":{
            remUnit: 75
        }
    }
};