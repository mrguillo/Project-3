import axios from "axios";

export default {
    getUserInfo: function(userID) {
      return axios.get("/api/users/find/" + userID);
    },
    createUser: function(userData){
      return axios.post("/api/users/create", userData);
    },
    createChallenge: function(challengeData){
      return axios.post("/api/challenges/create",challengeData)
    },
    joinChallenge: function(joinData){
      return axios.post("/api/challenges/join",joinData.data)
    },
    startChallenge: function(startChallengeData){
      return axios.post("api/challenges/start",startChallengeData)
    },
    createActivity: function(activityData){
      return axios.post("/api/activities/create",activityData)
    },
    unapprovedActivities: function(unapprovedInfo){
      return axios.get("/api/activities/unapproved",unapprovedInfo)
    },
    approveActivity: function(approvalInfo){
      return axios.post("/api/activities/approval", approvalInfo)
    },
    approvedInPeriod: function(challengeId){
      console.log("running approvedInPeriod: ",challengeId)
      return axios.get("/api/activities/approvedinperiod/" + challengeId)
    }
};


