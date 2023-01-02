export const getNumberInString = (string) => {
    let price;
    if (+string.search("đồng/tháng") !== -1) {
        price = +string.match(/\d+/)[0] / Math.pow(10, 3);
    } else if (+string.search("triệu/tháng") !== -1) {
        price = +string.match(/\d+/)[0];
    } else if (+string.search("m") !== -1) {
        price = +string.match(/\d+/)[0];
    }
    return price;
    console.log(price);
};
