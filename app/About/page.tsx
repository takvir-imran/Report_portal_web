import TopHeader from "../GlobalComponent/TopHeader";
import {AbsoluteCenter, Text} from "@chakra-ui/react";


export default function AboutPage() {

    return (
        <>
        <TopHeader />
            <AbsoluteCenter color="black">
                <Text textStyle="3xl" color="gray.600">This page is under Construction</Text>
            </AbsoluteCenter>
        </>
    );
}