import {NextResponse} from "next/server";

const middleware = (req) => {
    const baseUrl = "http://localhost:3000/";
    let verify = req.cookies.get('next-auth.session-token');
    let url = req.url;

    if(!verify && url.includes("/dashboard")) {
        return NextResponse.redirect(`${baseUrl}login`);
    }

    if(verify && url.includes("/login")) {
        return NextResponse.redirect(`${baseUrl}`);
    }
};

export default middleware;