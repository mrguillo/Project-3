import React from "react";

const UserContext = React.createContext({
    challenges: [],
    _id: "",
    username: "",
    email: "",
    firebaseId: "",
    creationDate: "",
    __v: 0
});

export default UserContext;