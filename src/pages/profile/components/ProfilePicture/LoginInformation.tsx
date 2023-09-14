
interface userId {
    uid: string | undefined;
}

function LoginInformation({uid}: userId) {
    return(
        <p className=" text-slate-100 flex justify-center mt-3">ID: {uid}</p>
    )
}

export default LoginInformation;