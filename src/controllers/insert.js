import * as authServices from "../services/insert";

export const insert = async (req, res) => {
    try {
        const response = await authServices.createPricesAndAreas();

        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};
