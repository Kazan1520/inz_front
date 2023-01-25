import {SERVER_URL} from "@/environment";

const SignOut = () => {

    fetch(`${SERVER_URL}/dj-rest-auth/logout/`, {
        method: "POST",
        credentials: "include",
    }).then(() => {
        window.location.href = "/";
    })

    return null;
}

export default SignOut;
