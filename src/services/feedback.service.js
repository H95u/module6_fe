import axios from "axios";

class FeedbackService {
    async static getFeedbackByReceiverId(id) {
        return await axios.get(`http://localhost:8080/api/feedbacks/receiver/${id}`)
    }

    async static createFeedBack(data) {
        return await axios.post(`http://localhost:8080/api/feedbacks/create`, data)
    }
}

export default FeedbackService;