const successDataResponse = (req, res, dataOrMessage, data = null) => {
    const response = {
        code: 200,
        payload: {
            success: true,
            message: null,
            data: null,
        }
    }
    if (typeof (dataOrMessage) == 'string') {
        response.payload.message = dataOrMessage
    } else {
        if (dataOrMessage?.message) {
            response.payload.message = dataOrMessage.message
            delete dataOrMessage.message
        }
        response.payload.data = dataOrMessage
    }

    if (data) response.payload.data = data;
   // console.log(response.payload)

    // _calcauleApiResponseTime(req, response)

    return res.status(response.code)
        .json(response.payload)
}

export default successDataResponse