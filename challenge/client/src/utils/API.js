import axios from "axios";

export default {
    // Saves a book to the database
    createChallenge: function(challengeData) {
      return axios.post("/api/challenges/create", challengeData);
    },
    createUser: function(userData){
      return axios.post("/api/users/create", userData);
    }
};


