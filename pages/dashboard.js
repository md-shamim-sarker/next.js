import {getSession} from "next-auth/react";

const Dashboard = () => {
    return (
        <div>
            <h1>Dashboard page</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, tempora earum ut quisquam expedita sit, quidem velit dolorum tenetur soluta magnam exercitationem ullam, mollitia illum explicabo temporibus dicta non et. Quidem libero sit officiis nemo atque autem quaerat minus reiciendis deserunt explicabo at, temporibus magnam id qui officia similique repellendus.
            </p>
        </div>
    );
};

export default Dashboard;

/* export async function getServerSideProps({req}) {
    const session = await getSession({req});

    if(!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        };
    }

    return {
        props: {session}
    };
} */