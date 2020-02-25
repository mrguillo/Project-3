import { useState } from "react";




const useUserModel = () => {
  const [userChallengesState, setUserChallenges] = useState({});
  const [userIdState, setuserIdState] = useState("");
  const [usernameState, setUserNameState] = useState("");
  const [firebaseIdState, setFirebaseIdState] = useState("");
  const [creationDateState, setCreationDateState] = useState("");

  return {
    // error: nameState === "" ? "Please enter a name" : "",
    challenges: {
      value: userChallengesState,
      onChange: e => setUserChallenges(e.target.value)
        },
    userId: {
      value: userIdState,
      onChange: e => setuserIdState(e.target.value)
    },
    username: {
      value: usernameState,
      onChange: e => setUserNameState(e.target.value)
    }
    // image: {
    //   value: imageState,
    //   onChange: e => setImage(e.target.value)
    // },
    // status: {
    //   value: statusState,
    //   onChange: e => setStatus(e.target.value)
    // },
    // excitementLevel: {
    //   value: excitementLevelState,
    //   onChange: e => setExcitementLevel(e.target.value)
    }
  };


export default useUserModel;