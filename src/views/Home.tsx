import { FC, ReactNode } from "react";
import './Home.css';

interface IHomeProps {
    children: ReactNode,
    titulo?: string,
};

const Home: FC<IHomeProps> = ({ children, titulo = "AluraTask" }) => {
    return <>
        <section className="main">
            <div className="container">
                <div id="task-form">
                    <div id="task-list">
                        <h2>{titulo}</h2>
                        {children}
                    </div>
                </div>
            </div>
        </section>
    </>
};

export default Home;