import axios from "axios";

class FeedbackService {
    static async getFeedbackByReceiverId(id) {
        return await axios.get(`http://localhost:8080/api/feedbacks/receiver/${id}`)
    }

    static async createFeedBack(data) {
        return await axios.post(`http://localhost:8080/api/feedbacks/create`, data)
    }
}

export default FeedbackService;