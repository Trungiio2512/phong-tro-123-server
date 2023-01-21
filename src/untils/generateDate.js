import moment from "moment";
const formatDate = (timeObj) => {
    const day = timeObj.getDay() === 0 ? "Chủ nhật" : `Thứ ${timeObj.getDay() + 1}`;
    const date = `${timeObj.getDate()}/${timeObj.getMonth() + 1}/${timeObj.getFullYear()}`;
    const time = `${timeObj.getHours()}:${timeObj.getMinutes()}`;
    return `${day}, ${time} ${date}`;
};

const generateDate = () => {
    const expiredRadom = Math.floor(Math.random() * 29) + 1;
    const currentDate = new Date();
    const expiredDay = moment(currentDate).add(expiredRadom, "d").toDate();

    return {
        today: formatDate(currentDate),
        expiredDay: formatDate(expiredDay),
    };
};

export default generateDate;
