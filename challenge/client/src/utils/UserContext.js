import React from "react";

const UserContext = React.createContext({
    challenges: [
        {
            participants: [
                "5e4f63d6e9607d58686f7f69"
            ],
            _id: "5e516017185d492b7452583c",
            name: "The best challenge",
            status: "created",
            duration: 5,
            unitCost: 100,
            currency: "USD",
            rules: "The rules are very complicated",
            owner: "5e4f63d6e9607d58686f7f69",
            creationDate: "2020-02-22T17:08:39.886Z",
            __v: 0
        }
    ],
    _id: "5e4f63d6e9607d58686f7f69",
    username: "jeroalva",
    email: "jeroalva@gmail.com",
    firebaseId: "12345",
    creationDate: "2020-02-21T05:00:06.218Z",
    __v: 0
});

export default UserContext;