import {redirect} from "next/navigation";
import TopHeader from "./GlobalComponent/TopHeader";
import { AbsoluteCenter, Text } from "@chakra-ui/react"
import {checkToken} from "./GlobalComponent/cookieMiddleware";


export default async function Home() {
    const check_login = await checkToken();
    console.log(check_login);
    if (!check_login) {
        redirect("/Login")
    }
    return (
        <>
            <TopHeader/>
            <AbsoluteCenter color="black">
                <Text textStyle="3xl" color="gray.600">Welcome to Dominos Report Portal</Text>
            </AbsoluteCenter>
        </>
    );
}

